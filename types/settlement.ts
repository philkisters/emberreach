
export interface SettlementDTO {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  invitationCode: string;
}

export interface SettlementCharacter {
  name: string;
  lastLogIn: Date;
}

export interface SettlementInfo {
  name: string
  latitude: number
  longitude: number
  invitationCode: string
  founder: SettlementCharacter
  members: SettlementCharacter[]
}