import type { SettlementInfo } from "~~/types/settlement"

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const settlementId = event.context.params?.id

  if (!settlementId) {
    throw createError({ statusCode: 400, statusMessage: 'Settlement ID is required' })
  }

  const settlement = await prisma.settlement.findUnique({
    where: {
      id: settlementId,
    },
    include: {
      characters: {
        select: {id: true, name: true, lastLogIn: true}
      }
    },
  })
  if (!settlement) {
    throw createError({ statusCode: 404, statusMessage: 'Settlement not found' })
  }

  const settlementInfo = {
    name: settlement.name,
    latitude: settlement.latitude,
    longitude: settlement.longitude,
    invitationCode: settlement.invitationCode,
    founder: settlement.characters.find(char => char.id === settlement.founderId),
    members: settlement.characters.map(({ id, ...char }) => char),
  } as SettlementInfo

  return settlementInfo
})
