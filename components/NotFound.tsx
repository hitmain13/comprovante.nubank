import { ArrowLeft } from 'lucide-react'
import { TriangleAlert } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 gap-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <TriangleAlert className="w-10 h-10 stroke-purple-600" />
          <p className="text-5xl font-bold">Ops!</p>
        </div>
        <h1 className="text-3xl">Transferência não encontrada!</h1>
        <p className="text-lg leading-1 text-gray-500 max-w-lg text-left">
          Parece que a página não foi encontrada. A página que você está procurando não foi
          encontrada, mas quem sabe ela apareça por aqui no futuro? Tente voltar para a página
          inicial ou dar uma olhadinha nos nossos outros conteúdos.
        </p>
      </div>
      <a
        href="/"
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a página inicial
      </a>
    </div>
  )
}
