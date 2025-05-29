export const ApiConfig = {
  getBaseUrl: (): string => process.env.API_URL || 'http://localhost:8000',

  getAuthorizationHeader: (): string => `Bearer ${process.env.API_TOKEN}`,

  getJsonHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: this.getAuthorizationHeader(),
    }
  },
}

export async function fetchApi(url: string, options: RequestInit) {
  console.log('@@@@: ', ApiConfig.getBaseUrl(), ApiConfig.getAuthorizationHeader())
  const response = await fetch(url, {
    headers: ApiConfig.getJsonHeaders(),
    ...options,
  })
  return response
}
