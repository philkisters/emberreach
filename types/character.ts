export interface CharacterCreationRequest {
  characterName: string
}

export interface CharacterDTO {
  id: string
  name: string
  settlementName?: string | null
  settlementId?: string | null
  lastLogIn: Date
}
