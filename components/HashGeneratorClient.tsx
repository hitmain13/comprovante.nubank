'use client'
import { ArrowLeftIcon, Loader2 } from 'lucide-react'
import { TextArea } from './TextArea'
import { useHashGeneratorClient } from '@/hooks'

export function HashGeneratorClient() {
  const {
    query,
    setQuery,
    hash,
    setHash,
    url,
    copied,
    hashType,
    setHashType,
    handleGenerate,
    handleCopy,
    loading,
    deleteLoading,
    handleDelete,
  } = useHashGeneratorClient()
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-50 p-4">
      <a
        href="/comprovante"
        className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700 underline"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to transfer page
      </a>
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-2">Gerador de Hash para Comprovante</h1>
        <label className="text-sm font-medium">
          Cole as querystrings ou URL (ex: chave1=valor1&chave2=valor2 ou /comprovante?...):
        </label>
        <TextArea
          query={query}
          setQuery={setQuery}
        />
        <button
          className="bg-purple-600 text-white rounded p-2 font-semibold hover:bg-purple-700"
          onClick={handleGenerate}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Gerando...
            </div>
          ) : (
            'Gerar hash'
          )}
        </button>
        {hash && (
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-medium">URL gerada:</label>
            <div className="flex gap-2 items-center">
              <input
                className="border rounded p-2 flex-1 text-xs"
                value={window.location.origin + url}
                readOnly
              />
              <button
                className="bg-gray-200 rounded px-2 py-1 text-xs hover:bg-gray-300"
                onClick={handleCopy}
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        )}
        <label className="text-sm font-medium">Delete:</label>
        <input
          className="border rounded p-2 flex-1 text-xs"
          type="text"
          value={hash}
          placeholder="Digite o hash para deletar"
          onChange={(e) => setHash(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white rounded p-2 font-semibold hover:bg-purple-700"
          onClick={handleDelete}
        >
          {deleteLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Deletando...
            </div>
          ) : (
            'Deletar hash'
          )}
        </button>
      </div>
    </div>
  )
}
