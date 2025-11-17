import type { CharacterDTO } from "~~/types/character"

export const useCharacter = () => {
  const characters = useState<CharacterDTO[]>('characters', () => [])
  const selectedCharacter = useState<CharacterDTO | null>('selectedCharacter', () => null)

  const createCharacter = async (characterName: string) => {
    try {
      const character = await $fetch<CharacterDTO>('/api/character/create', {
        method: 'POST',
        body: {
          characterName
        }
      })
      characters.value.push(character)
      console.log("Number of characters after creation:", characters.value.length)
      return character
    } catch (error) {
      console.error("Error creating character:", error)
      throw error
    }
  }

  const deleteCharacter = async (characterId: string) => {
    try {
      const response = await $fetch(`/api/character/${characterId}`, {
        method: 'DELETE'
      }) as { status: string }
      if (response && response.status !== "success") {
        throw new Error("Failed to delete character")
      }
      characters.value = characters.value.filter(c => c.id !== characterId)
      console.log("Number of characters after deletion:", characters.value.length)
      if (selectedCharacter.value?.id === characterId) {
        selectedCharacter.value = null
      }
    } catch (error) {
      console.error("Error deleting character:", error)
      throw error
    }
  }

  const fetchCharacters = async () => {
    try {
      const data = await $fetch<CharacterDTO[]>('/api/character/list')
      characters.value = data
    } catch (error) {
      console.error("Error fetching characters:", error)
    }
  }

  const calculateTimeSinceLastLogin = (lastLogIn: Date): string => {
    const now = new Date()
    const lastLoginDate = new Date(lastLogIn)
    const diffInMs = now.getTime() - lastLoginDate.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes === 1) return '1 minute ago'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours === 1) return '1 hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  fetchCharacters()

  return { characters, selectedCharacter, createCharacter, deleteCharacter, fetchCharacters, calculateTimeSinceLastLogin }
}
