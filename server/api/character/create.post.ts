import type { CharacterCreationRequest, CharacterDTO } from "~~/types/character"

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const request = await readBody(event) as CharacterCreationRequest

  if (!request.characterName || request.characterName.trim() === '') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Character name is required to create a new character.',
    })
  }

  const character = await prisma.character.create({
    data: {
      name: request.characterName,
      userId: user.id
    },
  })

  const characterDTO: CharacterDTO = {
    id: character.id,
    name: character.name,
    settlementName: null
  }

  return characterDTO
})
