import { TransactionData } from '@/types'

export async function fetchTransaction(hash: string | null): Promise<TransactionData | null> {
  if (!hash) return null
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/comprovante/${hash}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
