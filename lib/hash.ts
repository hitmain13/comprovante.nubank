export function generateReversibleHash(params: Record<string, string>): string {
  return btoa(encodeURIComponent(JSON.stringify(params)))
}

export function decodeReversibleHash(hash: string): Record<string, string> | null {
  try {
    const json = decodeURIComponent(atob(hash))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function generatePersistedHash(params: Record<string, string>): string {
  const json = JSON.stringify(params)
  let hashNum = 0
  for (let i = 0; i < json.length; i++) {
    hashNum = (hashNum << 5) - hashNum + json.charCodeAt(i)
    hashNum |= 0
  }
  return Math.abs(hashNum).toString(36)
}
