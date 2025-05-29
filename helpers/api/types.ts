export type SafeResponse<T> = { success: true; data: T } | { success: false; error: string }

export type Hash = { hash: string }
export type CreateHashParams = { params: Record<string, string> }
export type Message = { message: string }
export type DeleteHashResponse = Hash & { message: string }
export type ApiResponse<T> = T & { message?: string; error?: string }
export type TransactionDTO = {
  hash: string
  id: string
  value: string
  pix: string
  time: string
  originName: string
  originBank: string
  originAgency: string
  originAccount: string
  originCpf: string
  destName: string
  destBank: string
  destAgency: string
  destAccount: string
  destCpf: string
  transactionId: string
}

export type PortugueseTransactionDTO = {
  valor: string
  pix: string
  horario: string
  origem_nome: string
  origem_instituicao: string
  origem_agencia: string
  origem_conta: string
  origem_cpf: string
  destino_nome: string
  destino_instituicao: string
  destino_agencia: string
  destino_conta: string
  destino_cpf: string
  transacao_id: string
}
