import { Geolocation } from '@/hooks/useAcceptTransfer'
import { ApiErrorFactory } from './api-error-factory'
import {
  ApiResponse,
  CreateHashParams,
  DeleteHashResponse,
  Hash,
  Message,
  TransactionDTO,
} from './types'

interface IApiClient {
  createHash(params: CreateHashParams): Promise<Hash>
  getHash(hash: string): Promise<Hash>
  deleteHash(hash: string): Promise<DeleteHashResponse>
  deleteAllHashes(): Promise<Message>
}

export type GetAllLocationsResponse = {
  id: string
  hash: string
} & Geolocation

export class ApiClient implements IApiClient {
  public async sendTransfer(geolocation: Geolocation, hash: string): Promise<Message> {
    const parsedGeolocation = { ...geolocation }
    const url = `${ApiClient.getBaseUrl()}/location`
    return ApiClient.sendRequest<Message>(url, {
      method: 'POST',
      headers: ApiClient.getJsonHeaders(),
      body: ApiClient.getGeolocationParams(parsedGeolocation, hash),
    })
  }

  public async getAllLocations(): Promise<GetAllLocationsResponse[]> {
    const url = `${ApiClient.getBaseUrl()}/location`
    return ApiClient.sendRequest<GetAllLocationsResponse[]>(url, {
      method: 'GET',
      headers: ApiClient.getJsonHeaders(),
    })
  }

  public async createHash({ params }: CreateHashParams): Promise<Hash> {
    const url = `${ApiClient.getBaseUrl()}/transfer`
    const options = ApiClient.getBodyParams(params)
    return ApiClient.sendRequest<Hash>(url, options)
  }

  public async getHash(hash: string): Promise<TransactionDTO> {
    const url = `${ApiClient.getBaseUrl()}/transfer/${hash}`
    return ApiClient.sendRequest<TransactionDTO>(url, {
      method: 'GET',
      headers: ApiClient.getJsonHeaders(),
    })
  }

  public async getAllTransactions(): Promise<TransactionDTO[]> {
    const url = `${ApiClient.getBaseUrl()}/transfer`
    return ApiClient.sendRequest<TransactionDTO[]>(url, {
      method: 'GET',
      headers: ApiClient.getJsonHeaders(),
    })
  }

  public async deleteHash(hash: string): Promise<DeleteHashResponse> {
    const url = `${ApiClient.getBaseUrl()}/transfer/${hash}`
    const options = ApiClient.getDeleteOptions()
    return ApiClient.sendRequest<DeleteHashResponse>(url, options)
  }

  public async deleteAllHashes(): Promise<Message> {
    const url = `${ApiClient.getBaseUrl()}/transfer`
    const options = ApiClient.getDeleteOptions()
    return ApiClient.sendRequest<Message>(url, options)
  }

  private static getGeolocationParams(geolocation: Geolocation, hash: string): string {
    return JSON.stringify({
      hash,
      ...geolocation,
    })
  }

  private static getAuthorizationHeader() {
    return `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
  }

  private static getBaseUrl() {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }

  private static async sendRequest<T>(url: string, options: RequestInit): Promise<ApiResponse<T>> {
    const res = await fetch(url, options)

    if (res.ok) {
      return res.json() as Promise<ApiResponse<T>>
    }

    const errorText = await res.text()
    throw ApiErrorFactory.create(errorText, res.status)
  }

  private static getJsonHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: this.getAuthorizationHeader(),
    }
  }

  private static getBodyParams(params: Record<string, string>): RequestInit {
    return {
      method: 'POST',
      body: JSON.stringify(params),
      headers: this.getJsonHeaders(),
    }
  }

  private static getDeleteOptions(): RequestInit {
    return {
      method: 'DELETE',
      headers: this.getJsonHeaders(),
    }
  }
}
