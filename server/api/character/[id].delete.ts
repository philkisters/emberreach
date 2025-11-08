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

  await prisma.character.delete({
    where: {
      id: characterId,
    },
  })

  return { status: 'success' }
})
