import { apiFetch } from './api'

export interface CreateComprovantePayload {
  payload: Record<string, any>
  latitude?: number
  longitude?: number
}

export async function createComprovante({
  payload,
  latitude,
  longitude,
}: CreateComprovantePayload): Promise<{ hash: string }> {
  return apiFetch<{ hash: string }>(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/comprovante`,
    {
      method: 'POST',
      body: JSON.stringify({ payload, latitude, longitude }),
    }
  )
}
