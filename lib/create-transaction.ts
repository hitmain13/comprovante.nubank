import { apiFetch } from './api'

export interface CreateTransactionProps {
  payload: Record<string, any>
  latitude?: number
  longitude?: number
}

export async function createTransaction({
  payload,
  latitude,
  longitude,
}: CreateTransactionProps): Promise<{ hash: string }> {
  return apiFetch<{ hash: string }>(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/comprovante`,
    {
      method: 'POST',
      body: JSON.stringify({ payload, latitude, longitude }),
    }
  )
}
