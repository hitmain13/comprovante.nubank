import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'
const JWT_EXPIRES_IN = '1h'

export function signJwt(payload: object) {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyJwt(token: string) {
  try {
    return verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
