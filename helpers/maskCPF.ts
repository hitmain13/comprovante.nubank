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
  const unmaskedPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  const maskedPattern = /^•{3}\.\d{3}\.\d{3}-•{2}$/

  if (maskedPattern.test(cpf)) {
    return cpf // Already masked correctly
  }

  if (unmaskedPattern.test(cpf)) {
    return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, '•••.$2.$3-••')
  }

  console.error('CPF inválido. Use o formato XXX.XXX.XXX-XX ou •••.XXX.XXX-••.', cpf)
  return cpf
}
