import type React from 'react'
import { Nunito_Sans } from 'next/font/google'
import '@/app/globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
})

export const metadata = {
  title: 'Nubank - Reinventando a relação das pessoas com o dinheiro',
  description: 'Conta digital, cartão de crédito sem anuidade e muito mais. Tudo em um só app.',
  generator: 'Matsu.dev',
  icons: {
    icon: 'https://www.datocms-assets.com/120597/1741817368-favicon.ico?auto=format&h=96&w=96',
  },
  openGraph: {
    title: 'Nubank - Reinventando a relação das pessoas com o dinheiro',
    description: 'Conta digital, cartão de crédito sem anuidade e muito mais. Tudo em um só app.',
    siteName: 'Nome do site',
    images: [
      {
        url: 'https://www.mundorh.com.br/wp-content/uploads/2021/05/Novo-Logo-002.jpg',
        width: 1200,
        height: 630,
        alt: 'Descrição da imagem',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://www.mundorh.com.br/wp-content/uploads/2021/05/Novo-Logo-002.jpg',
        alt: 'Nubank',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunitoSans.variable}>
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
