import { defaultTextAreaValue } from '@/constants'
import { ApiClient } from '@/helpers/api'
import { parseQueryString } from '@/helpers/parseQuerystring'
import { generatePersistedHash, generateReversibleHash } from '@/lib/hash'
import { useState } from 'react'

export const useHashGeneratorClient = () => {
  const [query, setQuery] = useState(defaultTextAreaValue)
  const [hash, setHash] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [hashType, setHashType] = useState<'reversivel' | 'persistido'>('reversivel')

  const updateHash = (hash: string) => {
    setHash(hash)
    setUrl(`/comprovante/${hash}`)
    setCopied(false)
  }

  async function handleGenerate() {
    const params = parseQueryString(query)
    const res = await ApiClient.createHash({ params })
    if (res?.hash) return updateHash(res.hash)

    const hashStr =
      hashType === 'reversivel' ? generateReversibleHash(params) : generatePersistedHash(params)
    setHash(hashStr)
    setUrl(`/comprovante/${hashStr}`)
    setCopied(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + url)
    setCopied(true)
  }
  return {
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
  }
}
