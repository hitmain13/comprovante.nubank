import { format } from 'date-fns'

/**
 * Calcula o label relativo entre duas datas (inputDate e now), retornando "Agora mesmo", "X minutos atrás" ou "X horas atrás".
 *
 * @param inputDate - Data/hora do evento (Date)
 * @param now - Data/hora de referência (Date)
 * @returns string - Texto representando o tempo relativo
 */
export function getRelativeTimeLabel(inputDate: Date, now: Date): string {
  if (!now || !inputDate) {
    throw new Error(
      'Os parâmetros inputDate e now são obrigatórios para evitar hydration mismatch.'
    )
  }

  const diffMs = now.getTime() - inputDate.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)

  if (diffMinutes <= 0) return 'Agora mesmo'
  if (diffMinutes < 60) {
    return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`
  }

  const diffHours = Math.floor(diffMinutes / 60)
  return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`
}
