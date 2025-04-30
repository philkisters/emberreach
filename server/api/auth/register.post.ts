import { prisma } from '~~/server/utils/prisma'
import { setCookie } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, username, password } = body

  if (!email || !username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }

  // Check if user already exists
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  })
  if (existing) {
    throw createError({ statusCode: 400, statusMessage: 'User already exists' })
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
    },
  })

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  // Set session cookie
  setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
  })

  return { success: true, user: { id: user.id, email: user.email, username: user.username } }
})
