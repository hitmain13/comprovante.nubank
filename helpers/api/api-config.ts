// utils/api-config.ts
export const ApiConfig = {
  getBaseUrl: (): string => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',

  getAuthorizationHeader: (): string => `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,

  getJsonHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: this.getAuthorizationHeader(),
    }
  },
}
