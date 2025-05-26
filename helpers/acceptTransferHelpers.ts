// Passos de loading para o botão de aceitar transferência
export const ACCEPT_TRANSFER_LOADING_STEPS = [
  { text: 'Preparando...', duration: 1000 },
  { text: 'Aceitando transferência...', duration: 2000 },
  { text: 'Carregando...', duration: 3000 },
  { text: 'Quase lá...', duration: 3000 },
]

export type LoadingStep = {
  text: string
  duration: number
}
