import type React from 'react'
import '@/app/globals.css'

export const metadata = {
  title: 'Nubank - Reinventando a relação das pessoas com o dinheiro',
  description: 'Conta digital, cartão de crédito sem anuidade e muito mais. Tudo em um só app.',
  generator: 'Matsu.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
