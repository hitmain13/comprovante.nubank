/**
 * Converte um horário no formato "HHhMM" ou "HH:MM" (ex: "15h19" ou "15:19")
 * para uma descrição relativa como "Agora mesmo", "2 minutos atrás" ou "1 hora atrás".
 *
 * @param timeString - Horário no formato "HHhMM" ou "HH:MM"
 * @param now - (opcional) Objeto Date para simular o horário atual (útil para testes)
 * @returns string - Texto representando o tempo relativo
 */
export function getRelativeTimeLabel(timeString: string, now: Date = new Date()): string {
  if (!/^\d{1,2}[:h]\d{2}$/.test(timeString)) {
    throw new Error('Formato de hora inválido. Use "HHhMM" ou "HH:MM", ex: "15h19" ou "15:19".')
  }

  const separator = timeString.includes('h') ? 'h' : ':'
  const [hoursStr, minutesStr] = timeString.split(separator)

  const inputDate = new Date(now) // Clona o objeto para evitar efeitos colaterais
  inputDate.setHours(parseInt(hoursStr), parseInt(minutesStr), 0, 0)

  const diffMs = now.getTime() - inputDate.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)

  if (diffMinutes <= 0) return 'Agora mesmo'
  if (diffMinutes < 60) {
    return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`
  }

  const diffHours = Math.floor(diffMinutes / 60)
  return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`
}
