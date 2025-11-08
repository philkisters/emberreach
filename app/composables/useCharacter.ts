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

  fetchCharacters()

  return { characters, selectedCharacter, createCharacter, deleteCharacter, fetchCharacters }
}
