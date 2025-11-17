export interface CharacterCreationRequest {
  characterName: string
}

export interface CharacterDTO {
  id: string
  name: string
  settlementName?: string | null
  lastLogIn: Date
}
