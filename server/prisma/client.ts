import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
})

// Used for Dev-Hot-Reload to avoid multiple instances of Prisma Client
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
