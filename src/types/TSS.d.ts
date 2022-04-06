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

export type MatchProps = {
  A: string
  B: string
  winner: Winner
}

type TSSKnockoutRound = Record<number, MatchProps>

export type TSSKnockoutTable = Record<Round, TSSKnockoutRound> & {
  champions: string
}

export type TSSEvents = Record<Sport, TSSKnockoutTable>

export type TSSSchedule = Array<{
  id: number
  title: string
  sport: string
  time: string
  venue: string
  teams: Array<string>
}>

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type TSSDatabase = TSSEvents & {
  data: {
    schedule: TSSSchedule
  }
}
