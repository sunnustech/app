export type MatchRequest = {
  sport: 'dodgeball' | 'frisbee' | 'volleyball' | 'tchoukball'
  matchNumber: number
  winner: 'A' | 'B'
  round: Round
}

export type Round =
  | 'round_of_32'
  | 'round_of_16'
  | 'quarterfinals'
  | 'semifinals'
  | 'finals'
