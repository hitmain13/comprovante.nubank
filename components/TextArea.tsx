import { useRef, useEffect } from 'react'

export const TextArea = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (query: string) => void
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [query])

  return (
    <textarea
      ref={textAreaRef}
      className="border rounded p-2 min-h-[320px] text-sm"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="valor=1234.56&pix=11999999999&origem_nome=João..."
    />
  )
}
