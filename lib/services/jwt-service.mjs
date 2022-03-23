import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not set')
}

export const createToken = id => jwt.sign({ sub: id }, JWT_SECRET)
