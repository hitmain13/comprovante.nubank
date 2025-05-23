/**
 * Formats a number into Brazilian Real (BRL) currency format, using a comma as the decimal separator.
 *
 * @param value - The numeric value to format
 * @returns string - The formatted value, e.g., "R$ 200,00"
 */
export function formatToBRL(value: number): string {
  if (!isValidNumber(value)) {
    throw new Error('Valor inválido para formatação.') // Keeps the message in Portuguese
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Checks if a given value is a valid, finite number.
 *
 * @param value - The value to check
 * @returns boolean - True if the value is a valid number
 */
function isValidNumber(value: number): boolean {
  return typeof value === 'number' && isFinite(value)
}
