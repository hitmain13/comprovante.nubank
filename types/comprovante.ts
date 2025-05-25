export interface ComprovanteData {
  valor: string
  pixKey: string
  horario: string
  origemNome: string
  origemInstituicao: string
  origemAgencia: string
  origemConta: string
  origemCpf: string
  destinoNome: string
  destinoInstituicao: string
  destinoAgencia: string
  destinoConta: string
  destinoCpf: string
  transacaoId: string
  latitude?: number
  longitude?: number
  [key: string]: any
}
