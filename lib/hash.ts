import { ApiClient } from '@/helpers/api/api-client'

export function generateReversibleHash(params: Record<string, string>): string {
  return encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(params))))
}

export function decodeReversibleHash(hash: string): Record<string, string> | null {
  try {
    const json = decodeURIComponent(atob(decodeURIComponent(hash)))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export async function generatePersistedHash(
  params: Record<string, string>
): Promise<string | undefined> {
  const apiClient = new ApiClient()
  try {
    const res = await apiClient.createHash({ params })

    if (res?.hash) {
      return res.hash
    }
  } catch (error) {}
  return
}
