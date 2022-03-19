export type Sport = 'dodgeball' | 'frisbee' | 'volleyball' | 'tchoukball'

export type Winner = 'A' | 'B'

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
}
