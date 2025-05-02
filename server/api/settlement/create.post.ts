import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, latitude, longitude } = body

  if (!name || typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, latitude and longitude are required to create a new settlement.',
    })
  }

  const invitationCode = generateInvitationCode()

  const settlement = await prisma.settlement.create({
    data: {
      name,
      latitude,
      longitude,
      invitationCode,
    },
  })

  return settlement
})


function generateInvitationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}