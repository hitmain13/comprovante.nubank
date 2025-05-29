// app/api/login/route.ts
import { NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { signJwt } from '@/helpers/jwt'

export async function POST() {
  // Aqui você validaria credenciais (ex: body com usuário/senha)
  const token = signJwt({ access: true }) // Crie seu payload conforme necessário

  const cookie = serialize('locations_jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 hora
    sameSite: 'lax',
  })

  const response = NextResponse.json({ message: 'Login successful' })
  response.headers.set('Set-Cookie', cookie)

  return response
}
