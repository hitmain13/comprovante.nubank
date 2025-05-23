import { formatToBRL, getFirstName, getRelativeTimeLabel } from '@/helpers'
import { useSearchParams } from 'next/navigation'

// Hook personalizado para gerenciar os parâmetros de busca
export const useTransferParams = () => {
  const searchParams = useSearchParams()

  const valor = searchParams.get('valor') || '200,00'
  const pixKey = searchParams.get('pix') || '11978452751'
  const formattedAmount = formatToBRL(Number(valor) || 492)

  const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const horario = searchParams.get('horario') || now || '15:19'
  const horarioLabel = getRelativeTimeLabel(horario)

  const firstName = getFirstName(searchParams.get('origem_nome') || 'Rodrigo de Jesus Marques')
  const destinoFirstName = getFirstName(
    searchParams.get('destino_nome') || 'Jeferson de Jesus Marques'
  )

  const origemNome = searchParams.get('origem_nome') || 'Maria Luiza Marques Salles'
  const origemInstituicao = searchParams.get('origem_instituicao') || 'NU PAGAMENTOS - IP'
  const origemAgencia = searchParams.get('origem_agencia') || '0001'
  const origemConta = searchParams.get('origem_conta') || '55362458-2'
  const origemCpf = searchParams.get('origem_cpf') || '•••.452.168-••'

  const destinoNome = searchParams.get('destino_nome') || 'Jeferson de Jesus Marques'
  const destinoInstituicao = searchParams.get('destino_instituicao') || 'PICPAY PAGAMENTO S/A'
  const destinoAgencia = searchParams.get('destino_agencia') || '0001'
  const destinoConta = searchParams.get('destino_conta') || '55362458-2'
  const destinoCpf = searchParams.get('destino_cpf') || '•••.452.168-••'

  return {
    valor,
    pixKey,
    formattedAmount,
    horario,
    horarioLabel,
    firstName,
    destinoFirstName,
    origemNome,
    origemInstituicao,
    origemAgencia,
    origemConta,
    origemCpf,
    destinoNome,
    destinoInstituicao,
    destinoAgencia,
    destinoConta,
    destinoCpf,
  }
}
