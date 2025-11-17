import { prisma } from '~~/server/utils/prisma'
import type { CharacterDTO } from '~~/types/character'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const characters = await prisma.character.findMany({
    where: { userId: user.id },
    orderBy: { lastLogIn: 'desc' },
    include: {
      settlement: {
        select: { name: true, id: true}
      }
    }
  })

  const charactersDTO: CharacterDTO[] = characters.map((char) => ({
    id: char.id,
    name: char.name,
    settlementName: char.settlement?.name ?? null,
    settlementId: char.settlement?.id ?? null,
    lastLogIn: char.lastLogIn,
  }))

  return charactersDTO
})
