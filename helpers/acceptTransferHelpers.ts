// Passos de loading para o botão de aceitar transferência
export const ACCEPT_TRANSFER_LOADING_STEPS = [
  { text: 'Accepting transfer...', duration: 2000 },
  { text: 'Loading...', duration: 3000 },
  { text: 'Almost there...', duration: 3000 },
]

export type LoadingStep = {
  text: string
  duration: number
}
