import type React from 'react'
import '@/app/globals.css'

export const metadata = {
  title: 'Nubank - Reinventando a relação das pessoas com o dinheiro',
  description: 'Conta digital, cartão de crédito sem anuidade e muito mais. Tudo em um só app.',
  generator: 'Matsu.dev',
  icons: {
    icon: 'https://www.datocms-assets.com/120597/1741817368-favicon.ico?auto=format&h=96&w=96',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          href="https://www.datocms-assets.com/120597/1741817368-favicon.ico?auto=format&h=96&w=96"
          type="image/x-icon"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
