import { generateMetadataHelper, GenerateMetadataProps } from '@/helpers'
import type { ReactNode } from 'react'

export default function ComprovanteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
