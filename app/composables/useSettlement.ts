import type { SettlementDTO, SettlementInfo } from "~~/types/settlement"

export const useSettlement = () => {
  const settlements = useState<SettlementDTO[]>('settlements', () => [])
  const activeSettlement = useState<SettlementInfo | null>('activeSettlement', () => null)
  
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

  const loadActiveSettlement = async (settlementId: string) => {
    try {
      const settlement = await $fetch<SettlementInfo>(`/api/settlement/${settlementId}`)
      activeSettlement.value = settlement
    } catch (error) {
      console.error("Error loading active settlement:", error)
    }
  }

  return { settlements, createSettlement, loadActiveSettlement, activeSettlement }
}
