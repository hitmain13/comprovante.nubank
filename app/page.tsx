import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Shield, Smartphone, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600"></div>
            <span className="text-xl font-bold">Nuubank</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#"
              className="text-sm font-medium"
            >
              Início
            </Link>
            <Link
              href="#"
              className="text-sm font-medium"
            >
              Conta Digital
            </Link>
            <Link
              href="#"
              className="text-sm font-medium"
            >
              Cartão de Crédito
            </Link>
            <Link
              href="#"
              className="text-sm font-medium"
            >
              Investimentos
            </Link>
            <Link
              href="#"
              className="text-sm font-medium"
            >
              Sobre Nós
            </Link>
            <Link
              href="/comprovante"
              className="text-sm font-medium text-purple-600"
            >
              Comprovante
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden md:flex"
            >
              Login
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Abra sua conta</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    Reinventando a relação das pessoas com o dinheiro
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl">
                    Conta digital, cartão de crédito sem anuidade e muito mais. Tudo em um só app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    Quero ser Nuubank
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=450"
                  width={450}
                  height={550}
                  alt="Smartphone com o aplicativo Nuubank"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossos Produtos</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conheça as soluções que estão transformando a vida financeira de milhões de
                  brasileiros.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Cartão de Crédito</h3>
                  <p className="text-muted-foreground">
                    Sem anuidade e com benefícios exclusivos. Controle total pelo app.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Smartphone className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Conta Digital</h3>
                  <p className="text-muted-foreground">
                    Conta completa e sem tarifas. Transferências, pagamentos e muito mais.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Investimentos</h3>
                  <p className="text-muted-foreground">
                    Comece a investir de forma simples e segura, direto do app.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Por que escolher o Nuubank?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubra as vantagens que fazem a diferença na sua vida financeira.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-purple-600 p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Segurança</h3>
                <p className="text-muted-foreground">
                  Proteção avançada para suas transações e dados pessoais.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-purple-600 p-3">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Praticidade</h3>
                <p className="text-muted-foreground">
                  Tudo o que você precisa em um só aplicativo, disponível 24/7.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-purple-600 p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Atendimento</h3>
                <p className="text-muted-foreground">
                  Suporte humano e eficiente para resolver suas questões.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Depoimentos</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Veja o que nossos clientes estão dizendo sobre nós.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Ana Silva</p>
                      <p className="text-sm text-muted-foreground">Cliente desde 2019</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "O Nuubank mudou minha relação com o dinheiro. Agora tenho controle total das
                    minhas finanças."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Carlos Oliveira</p>
                      <p className="text-sm text-muted-foreground">Cliente desde 2020</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "Atendimento excelente e app super intuitivo. Nunca mais volto para bancos
                    tradicionais."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Mariana Costa</p>
                      <p className="text-sm text-muted-foreground">Cliente desde 2021</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "Os investimentos do Nuubank são perfeitos para quem está começando. Simples e
                    rentáveis."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-purple-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="space-y-3">
              <h4 className="text-lg font-bold">Nuubank</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Imprensa
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-bold">Produtos</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Conta Digital
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Cartão de Crédito
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Investimentos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-bold">Ajuda</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Comunidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-bold">Contato</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    0800 608 6236
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    meajuda@Nuubank.com.br
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Redes Sociais
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200/20 pt-6 text-center text-sm">
            <p>© 2025 Nuubank. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
