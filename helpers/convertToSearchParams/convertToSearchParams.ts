import { PortugueseTransactionDTO, TransactionDTO } from '@/helpers/api/types'

export const convertToSearchParams = (transaction: TransactionDTO): PortugueseTransactionDTO => {
  return {
    valor: transaction.value,
    pix: transaction.pix,
    horario: transaction.time,
    origem_nome: transaction.originName,
    origem_instituicao: transaction.originBank,
    origem_agencia: transaction.originAgency,
    origem_conta: transaction.originAccount,
    origem_cpf: transaction.originCpf,
    destino_nome: transaction.destName,
    destino_instituicao: transaction.destBank,
    destino_agencia: transaction.destAgency,
    destino_conta: transaction.destAccount,
    destino_cpf: transaction.destCpf,
    transacao_id: transaction.transactionId,
  }
}
