import { formatToBRL } from '@/helpers/formatToBRL'
import {
  convertToSearchParams,
  getTransactionProps,
} from '@/helpers'

export default async function NubankReceiptPage({ searchParams }: { searchParams: Record<string, string> }) {
  const convertedSearchParams = convertToSearchParams(searchParams)
  const props = getTransactionProps(convertedSearchParams, searchParams)
  const formattedAmount = formatToBRL(Number(props.valor) || 492)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-96 bg-white rounded-xl shadow-none border-0">
        <div className="flex flex-col items-left mb-2">
          <img src="/nubank-comprovante.png" alt="Nubank logo" className="w-12 h-12 ml-4 mt-2 mb-6" />
        </div>
        <h1 className="text-2xl font-bold px-4 mb-1 mt-2">Comprovante de transferência</h1>
        <div className="text-gray-500 text-sm px-4 mb-6">15 JUL 2025 - 07:20:59</div>

        <div className="flex justify-between items-center px-4 mb-2">
          <span className="text-gray-800 font-bold">Valor</span>
          <span className="text-gray-500 font-semibold text-md">{formattedAmount}</span>
        </div>
        <div className="flex justify-between items-center px-4 mb-6">
          <span className="text-gray-800 font-bold">Tipo de transferência</span>
          <span className="text-gray-500 font-semibold">Pix</span>
        </div>

        <Divider />

        <SectionTitle>Destino</SectionTitle>
        <InfoGrid>
          <InfoLabel>Nome</InfoLabel>
          <InfoValue>{props.destinoNome}</InfoValue>
          <InfoLabel>CPF</InfoLabel>
          <InfoValue>{maskCpf(props.destinoCpf)}</InfoValue>
          <InfoLabel>Instituição</InfoLabel>
          <InfoValue>{props.destinoInstituicao}</InfoValue>
          <InfoLabel>Agência</InfoLabel>
          <InfoValue>{props.destinoAgencia}</InfoValue>
          <InfoLabel>Conta</InfoLabel>
          <InfoValue>{props.destinoConta}</InfoValue>
          <InfoLabel>Tipo de conta</InfoLabel>
          <InfoValue>Conta de pagamentos</InfoValue>
        </InfoGrid>

        <Divider />

        <SectionTitle>Origem</SectionTitle>
        <InfoGrid>
          <InfoLabel>Nome</InfoLabel>
          <InfoValue>{props.origemNome}</InfoValue>
          <InfoLabel>Instituição</InfoLabel>
          <InfoValue>{props.origemInstituicao}</InfoValue>
          <InfoLabel>Agência</InfoLabel>
          <InfoValue>{props.origemAgencia}</InfoValue>
          <InfoLabel>Conta</InfoLabel>
          <InfoValue>{props.origemConta}</InfoValue>
          <InfoLabel>CPF</InfoLabel>
          <InfoValue>{maskCpf(props.origemCpf)}</InfoValue>
        </InfoGrid>

        <div className="mt-6 mb-2 text-xs text-black p-4 py-10 bg-gray-200">
          <div className="mb-1 font-bold">Nu Pagamentos S.A. - Instituição de Pagamento</div>
          <div className="mb-2 font-bold">CNPJ 18.236.120/0001-58</div>
          <div className="mb-1 font-bold">ID da transação:</div>
          <div className="mb-2 break-all font-bold">{props.transacaoId}</div>
          <div className="mb-1 text-gray-500">Estamos aqui para ajudar se você tiver alguma dúvida.</div>
          <a href="#" className="text-[#8A05BE] font-medium text-sm mb-1 inline-block">Me ajuda <span aria-hidden>→</span></a>
          <div className="mt-2 text-gray-500">Ouvidoria: 0800 887 0463 | ouvidoria@nubank.com.br<br/>(Atendimento das 8h às 18h em dias úteis).</div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-500 font-semibold text-xs mt-4 mb-6 px-4">{children}</div>
}
function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm px-4 mb-2">{children}</div>
}
function InfoLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-black font-bold">{children}</span>
}
function InfoValue({ children }: { children: React.ReactNode }) {
  return <span className="text-gray-500 text-right">{children}</span>
}
function maskCpf(cpf: string) {
  if (!cpf) return ''
  return cpf.replace(/(\d{3})\d{3}(\d{3})/, '•••$2•••')
} 
function Divider() {
  return <div className="w-full border-t border-gray-200 my-4" />
}