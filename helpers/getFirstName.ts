/**
 * Returns only the first name from a full name string.
 *
 * @param fullName - The full name (e.g., "Jeferson de Jesus Santos")
 * @returns string - The first name (e.g., "Jeferson")
 */
export function getFirstName(fullName: string): string {
  if (!isValidName(fullName)) {
    throw new Error('Nome inválido.') // Mensagem em pt-br conforme orientação
  }

  return fullName.trim().split(/\s+/)[0]
}

/**
 * Validates that the name is a non-empty string.
 *
 * @param name - The name to validate
 * @returns boolean - True if the name is valid
 */
function isValidName(name: string): boolean {
  return typeof name === 'string' && name.trim().length > 0
}
