export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const characterId = event.context.params?.id

  if (!characterId) {
    throw createError({ statusCode: 400, statusMessage: 'Character ID is required' })
  }

  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
  })

  if (!character || character.userId !== user.id) {
    throw createError({ statusCode: 404, statusMessage: 'Character not found' })
  }

  if (character.settlementId) {
    const charactersInSettlement = await prisma.character.findMany({
      where: {
        settlementId: character.settlementId,
      },
    })

    const settlement = await prisma.settlement.findUnique({
      where: {
        id: character.settlementId,
      },
    })

    if (settlement && settlement.founderId === character.id && charactersInSettlement.length > 1) {
      throw createError({ statusCode: 400, statusMessage: 'Cannot delete character who is the founder of the settlement with other characters' })
    }

    if (settlement && settlement.founderId === character.id && charactersInSettlement.length === 1) {
      // Character is the founder and the only character in the settlement, delete settlement and character
      await prisma.settlement.delete({
        where: {
          id: settlement.id,
        },
      })
      await prisma.character.delete({
        where: {
          id: characterId,
        },
      })
      return { status: 'success' }
    }

    if (settlement && settlement.founderId !== character.id && charactersInSettlement.length > 1) {
      // There are other characters in the settlement, allow deletion
      await prisma.character.delete({
        where: {
          id: characterId,
        },
      })
      return { status: 'success' }
    }
  }
})
