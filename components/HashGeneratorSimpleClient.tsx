'use client'
import { useState } from 'react'

export function HashGeneratorSimpleClient() {
  const [query, setQuery] = useState('')
  const [hash, setHash] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)

  function handleGenerate() {
    const params = Object.fromEntries(new URLSearchParams(query))
    const json = JSON.stringify(params)
    let hashNum = 0
    for (let i = 0; i < json.length; i++) {
      hashNum = (hashNum << 5) - hashNum + json.charCodeAt(i)
      hashNum |= 0
    }
    const hashStr = Math.abs(hashNum).toString(36)
    setHash(hashStr)
    setUrl(`/comprovante/${hashStr}`)
    setCopied(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(window.location.origin + url)
    setCopied(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-2">Gerador de Hash para Comprovante</h1>
        <label className="text-sm font-medium">
          Cole as querystrings (ex: chave1=valor1&chave2=valor2):
        </label>
        <textarea
          className="border rounded p-2 min-h-[80px] text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="valor=1234.56&pix=11999999999&origem_nome=João..."
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
