export function parseQueryString(raw: string): Record<string, string> {
  let query = raw.trim()
  const qIndex = query.indexOf('?')
  if (qIndex !== -1) {
    query = query.slice(qIndex + 1)
  }

  // Remove apenas quebras de linha
  query = query.replace(/[\n\r]/g, '')

  // Remove & duplicados e nas bordas
  query = query.replace(/&&+/g, '&').replace(/^&+|&+$/g, '')
  query = query.replace(/\?+/g, '')

  const params = Object.fromEntries(new URLSearchParams(query))
  // Garante que todos os valores são strings, mas mantém os espaços intactos
  return Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v).trim()]))
}
