import { ApiErrorFactory } from './api-error-factory'
import { SafeResponse } from './types'

export async function safeRequest<T>(url: string, options: RequestInit): Promise<SafeResponse<T>> {
  try {
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      return { success: true, data }
    }

    const errorText = await response.text()
    ApiErrorFactory.create(errorText, response.status)
    return { success: false, error: errorText }
  } catch (err) {
    console.error('Request error:', err)
    ApiErrorFactory.create(err as string, 500)
    return { success: false, error: 'Unexpected error occurred' }
  }
}
