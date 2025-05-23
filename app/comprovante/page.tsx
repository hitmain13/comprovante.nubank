'use client'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useTransferParams } from '@/hooks'
import { AddIcon } from '@/icons'

export default function Comprovante() {
  const {
    formattedAmount,
    pixKey,
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
  } = useTransferParams()

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
        <div className="relative my-8 flex justify-center overflow-hidden">
          {/* Semicírculo esquerdo */}
          <div className="absolute left-0 top-1/2 translate-y-5 -translate-x-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 z-10"></div>
          {/* Semicírculo direito */}
          <div className="absolute right-0 top-1/2 translate-y-5 translate-x-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 z-10"></div>
          <div className="border border-gray-200 rounded-lg w-full max-w-md bg-white shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col items-center pb-2">
              <span className="text-3xl font-bold text-gray-900 mb-2">{formattedAmount}</span>
              <span className="text-lg text-gray-700 mb-1">para {destinoFirstName}</span>
              <span className="text-sm text-gray-400 mb-4">
                {horarioLabel} • {horario}
              </span>
            </div>
            {/* Linha tracejada */}
            <div className="w-full border-t border-dashed border-gray-300"></div>
            <div className="p-6 pt-4 flex flex-col items-center">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2">
                <AddIcon />
                Enviar comprovante
              </Button>
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
    </div>
  )
}
