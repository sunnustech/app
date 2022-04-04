export type Sport = 'dodgeball' | 'frisbee' | 'volleyball' | 'tchoukball'

export type Winner = 'A' | 'B' | 'U'

export type Round =
  | 'round_of_32'
  | 'round_of_16'
  | 'quarterfinals'
  | 'semifinals'
  | 'finals'

export type MatchRequest = {
  sport: Sport
  matchNumber: number
  winner: Winner
  round: Round
}

export type MatchParticipants = {
  A: string
  B: string
  winner: Winner
}

export type TSSKnockoutTable = {
  round_of_32: {
    [key: number]: { A: string; B: string; winner: Winner }
  }
  round_of_16: {
    [key: number]: { A: string; B: string; winner: Winner }
  }
  quarterfinals: {
    [key: number]: { A: string; B: string; winner: Winner }
  }
  semifinals: {
    [key: number]: { A: string; B: string; winner: Winner }
  }
  finals: {
    [key: number]: { A: string; B: string; winner: Winner }
  }
  champions: string
}

export type TSSEvents = {
  [key: string]: TSSKnockoutTable
}

export type TSSSchedule = Array<{
  id: number
  title: string
  sport: string
  time: string
  venue: string
  teams: Array[string]
}>

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type TSSData = {
  dodgeball: TSSKnockoutTable
  frisbee: TSSKnockoutTable
  volleyball: TSSKnockoutTable
  tchoukball: TSSKnockoutTable
  data: {
    schedule: TSSSchedule
  }
}
