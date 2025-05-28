import { maskCPF } from '../maskCPF'
import { PortugueseTransactionDTO } from '../api/types'

export function getTransactionProps(
  data: PortugueseTransactionDTO | null,
  searchParams: Record<string, string>
) {
  return {
    valor: data?.valor || searchParams.valor || '492,00',
    pixKey: data?.pix || searchParams.pix || '11978452751',
    horario: data?.horario || searchParams.horario || '15:19',
    origemNome: data?.origem_nome || searchParams.origem_nome || 'Fabio Marques Salles',
    origemInstituicao:
      data?.origem_instituicao || searchParams.origem_instituicao || 'NU PAGAMENTOS - IP',
    origemAgencia: data?.origem_agencia || searchParams.origem_agencia || '0001',
    origemConta: data?.origem_conta || searchParams.origem_conta || '55362458-2',
    origemCpf: maskCPF(data?.origem_cpf || searchParams.origem_cpf || '123.452.168-12'),
    destinoNome: data?.destino_nome || searchParams.destino_nome || 'Mirella',
    destinoInstituicao:
      data?.destino_instituicao || searchParams.destino_instituicao || 'NU PAGAMENTOS - IP',
    destinoAgencia: data?.destino_agencia || searchParams.destino_agencia || '0001',
    destinoConta: data?.destino_conta || searchParams.destino_conta || '55362458-2',
    destinoCpf: maskCPF(data?.destino_cpf || searchParams.destino_cpf || '123.452.168-12'),
    transacaoId:
      data?.transacao_id || searchParams.transacao_id || 'E18326120202302270004a12b2d410b2',
  }
}
