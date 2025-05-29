// app/api/login/route.ts
import { NextResponse } from 'next/server'
import { serialize } from 'cookie'
import { signJwt } from '@/helpers/jwt'

export async function POST() {
  const token = signJwt({ access: true })

  const cookie = serialize('locations_jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'lax',
  })

  const response = NextResponse.json({ message: 'Login successful' })
  response.headers.set('Set-Cookie', cookie)

  return response
}
