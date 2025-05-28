import { headers } from 'next/headers'
import { ApiErrorFactory } from './api-error-factory'

type CreateHashParams = {
  params: Record<string, string>
}

type CreateHashResponse = { hash: string }

export class ApiClient {
  private static getBodyParams(params: Record<string, string>) {
    return {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  private static getEndpoint() {
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/transfer`
  }

  public static async createHash({ params }: CreateHashParams): Promise<CreateHashResponse> {
    const res = await fetch(this.getEndpoint(), this.getBodyParams(params))
    if (res.ok) return await res.json()

    throw ApiErrorFactory.create(await res.text(), res.status)
  }
}
