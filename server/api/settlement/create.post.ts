import { prisma } from '~~/server/utils/prisma'

import type { SettlementDTO } from '~~/types/settlement'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, latitude, longitude, founderId } = body

  if (!name || typeof latitude !== 'number' || typeof longitude !== 'number' || !founderId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, latitude, longitude, and founderId are required to create a new settlement.',
    })
  }

  try {
    // 1. Check if character exists
    const character = await prisma.character.findUnique({
      where: { id: founderId },
    })

    if (!character) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Character not found.',
      })
    }

    // 2. Check if character is already member of another settlement
    if (character.settlementId) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Character is already member of a settlement.',
      })
    }

    const invitationCode = generateInvitationCode()

    // 3. Create settlement and update character in transaction
    const settlement = await prisma.$transaction(async (tx) => {
      // Create settlement
      const newSettlement = await tx.settlement.create({
        data: {
          name,
          latitude,
          longitude,
          invitationCode,
          founderId,
        },
      })

      // Update character to be member of the new settlement
      await tx.character.update({
        where: { id: founderId },
        data: { settlementId: newSettlement.id }
      })

      return newSettlement
    })

    return settlement as SettlementDTO

  } catch (error) {
    // Re-throw our custom errors
    if (error.statusCode) {
      throw error
    }
    
    // Handle other database errors
    console.error('Settlement creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create settlement.',
    })
  }
})


function generateInvitationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}