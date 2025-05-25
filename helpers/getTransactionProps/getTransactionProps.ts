import { TransactionData } from '@/types'
import { maskCPF } from '../maskCPF'

export function getTransactionProps(
  data: TransactionData | null,
  searchParams: Record<string, string>
) {
  return {
    valor: data?.valor || searchParams.valor || '492,00',
    pixKey: data?.pixKey || searchParams.pix || '11978452751',
    horario: data?.horario || searchParams.horario || '15:19',
    origemNome: data?.origemNome || searchParams.origem_nome || 'Maria Luiza Marques Salles',
    origemInstituicao:
      data?.origemInstituicao || searchParams.origem_instituicao || 'NU PAGAMENTOS - IP',
    origemAgencia: data?.origemAgencia || searchParams.origem_agencia || '0001',
    origemConta: data?.origemConta || searchParams.origem_conta || '55362458-2',
    origemCpf: maskCPF(data?.origemCpf || searchParams.origem_cpf || '123.452.168-12'),
    destinoNome: data?.destinoNome || searchParams.destino_nome || 'Mirella',
    destinoInstituicao:
      data?.destinoInstituicao || searchParams.destino_instituicao || 'NU PAGAMENTOS - IP',
    destinoAgencia: data?.destinoAgencia || searchParams.destino_agencia || '0001',
    destinoConta: data?.destinoConta || searchParams.destino_conta || '55362458-2',
    destinoCpf: maskCPF(data?.destinoCpf || searchParams.destino_cpf || '123.452.168-12'),
    transacaoId:
      data?.transacaoId || searchParams.transacao_id || 'E18326120202302270004a12b2d410b2',
  }
}
