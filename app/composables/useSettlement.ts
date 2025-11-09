import type { SettlementDTO } from "~~/types/settlement"

export const useSettlement = () => {
  const settlements = useState<SettlementDTO[]>('settlements', () => [])
  
  const createSettlement = async (name: string, latitude: number, longitude: number, founderId: string) => {
    try {
      const settlement = await $fetch<SettlementDTO>('/api/settlement/create', {
        method: 'POST',
        body: {
          name,
          latitude,
          longitude,
          founderId
        }
      })
      settlements.value.push(settlement)
      console.log("Number of settlements after creation:", settlements.value.length)
      return settlement
    } catch (error) {
      console.error("Error creating settlement:", error)
      throw error
    }
  }

  return { settlements, createSettlement }
}
