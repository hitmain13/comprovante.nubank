/**
 * Masks a CPF string by hiding the first three and last two digits.
 * Accepts both masked and unmasked input.
 *
 * Examples:
 * "987.654.321-00" → "•••.654.321-••"
 * "•••.654.321-••" → "•••.654.321-••"
 *
 * @param cpf - The CPF string in the format XXX.XXX.XXX-XX or masked
 * @returns string - The masked CPF string
 */
export function maskCPF(cpf: string): string {
  // Remove tudo que não for número
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) {
    console.error('CPF inválido. Deve conter 11 dígitos numéricos.', cpf)
    return '•••.•••.•••-••'
  }
  // Formata para XXX.XXX.XXX-XX
  const formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9
  )}-${digits.slice(9, 11)}`
  // Aplica a máscara
  return formatted.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, '•••.$2.$3-••')
}
