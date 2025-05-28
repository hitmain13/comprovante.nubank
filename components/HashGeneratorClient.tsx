'use client'
import { TextArea } from './TextArea'
import { useHashGeneratorClient } from '@/hooks'

export function HashGeneratorClient() {
  const { query, setQuery, hash, url, copied, hashType, setHashType, handleGenerate, handleCopy } =
    useHashGeneratorClient()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-2">Gerador de Hash para Comprovante</h1>
        <label className="text-sm font-medium">Tipo de hash:</label>
        <select
          className="border rounded p-2 text-sm"
          value={hashType}
          onChange={(e) => setHashType(e.target.value as 'reversivel' | 'persistido')}
        >
          <option value="reversivel">Reversível (base64, funciona em qualquer lugar)</option>
          <option value="persistido">Persistido (hash curto, requer backend)</option>
        </select>
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
          Gerar hash
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
      </div>
    </div>
  )
}
