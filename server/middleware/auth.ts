import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth-token')

  if (!token) {
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    if (user) {
      event.context.user = {
        id: user.id,
        email: user.email,
        username: user.username,
      }
    }
  } catch (error) {
    // Ungültiges Token, nichts tun
  }
})
