import { Geolocation } from '@/hooks/useAcceptTransfer'

import {
  CreateHashParams,
  DeleteHashResponse,
  Hash,
  Message,
  SafeResponse,
  TransactionDTO,
} from './types'
import { safeRequest } from './http-client'
import { ApiConfig } from '@/app/api/fetch/route'

export type GetAllLocationsResponse = {
  id: string
  hash: string
} & Geolocation

export interface IApiClient {
  createHash(params: CreateHashParams): Promise<SafeResponse<Hash>>
  getHash(hash: string): Promise<SafeResponse<TransactionDTO>>
  deleteHash(hash: string): Promise<SafeResponse<DeleteHashResponse>>
  deleteAllHashes(): Promise<SafeResponse<Message>>
}

export class ApiClient implements IApiClient {
  private readonly baseUrl = ApiConfig.getBaseUrl()
  private readonly headers = ApiConfig.getJsonHeaders()

  public async getPassword(): Promise<SafeResponse<string>> {
    const url = `${this.baseUrl}/password`
    return safeRequest<string>(url, { method: 'GET', headers: this.headers })
  }

  public async checkPassword(password: string): Promise<SafeResponse<boolean>> {
    const url = `${this.baseUrl}/password/authenticate`
    console.log('url', url)
    return safeRequest<boolean>(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ password }),
    })
  }

  public async sendTransfer(geo: Geolocation, hash: string): Promise<SafeResponse<Message>> {
    const url = `${this.baseUrl}/location`
    const body = JSON.stringify({ hash, ...geo })

    return safeRequest<Message>(url, {
      method: 'POST',
      headers: this.headers,
      body,
    })
  }

  public async getAllLocations(): Promise<SafeResponse<GetAllLocationsResponse[]>> {
    const url = `${this.baseUrl}/location`
    return safeRequest<GetAllLocationsResponse[]>(url, {
      method: 'GET',
      headers: this.headers,
    })
  }

  public async createHash({ params }: CreateHashParams): Promise<SafeResponse<Hash>> {
    const url = `${this.baseUrl}/transfer`
    return safeRequest<Hash>(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(params),
    })
  }

  public async getHash(hash: string): Promise<SafeResponse<TransactionDTO>> {
    const url = `${this.baseUrl}/transfer/${hash}`
    return safeRequest<TransactionDTO>(url, {
      method: 'GET',
      headers: this.headers,
    })
  }

  public async getAllTransactions(): Promise<SafeResponse<TransactionDTO[]>> {
    const url = `${this.baseUrl}/transfer`
    return safeRequest<TransactionDTO[]>(url, {
      method: 'GET',
      headers: this.headers,
    })
  }

  public async deleteHash(hash: string): Promise<SafeResponse<DeleteHashResponse>> {
    const url = `${this.baseUrl}/transfer/${hash}`
    return safeRequest<DeleteHashResponse>(url, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  public async deleteAllHashes(): Promise<SafeResponse<Message>> {
    const url = `${this.baseUrl}/transfer`
    return safeRequest<Message>(url, {
      method: 'DELETE',
      headers: this.headers,
    })
  }
}
