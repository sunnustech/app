import { UseState } from '@/types/SOAR'

export type Sport =
  | 'dodgeball'
  | 'frisbee'
  | 'volleyball'
  | 'tchoukball'
  | 'tchoukball'
  | 'touchRugby'
  | 'none'
  | 'more than 1'

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

export type Match = {
  A: string
  B: string
  winner: Winner
  scoreA: number
  scoreB: number
}

type Matches = Record<number, Match>

export type Rounds = Record<Round, Matches> & {
  champions: string
}

type Sports = Record<Sport, Rounds>

type TSSScheduleEvent = {
  id: number
  title: string
  sport: string
  time: string
  venue: string
  teams: Array<string>
}

export type TSSSchedule = Array<TSSScheduleEvent>

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type TSSDatabase = Sports & {
  data: {
    schedule: TSSSchedule
  }
}

/*
 * knockout table Front-end
 */

export type CurrentPageState = Record<Round, number>

export type Field = 'sport' | 'round' | 'matchNumber'
export type FieldStates = {
  sport: UseState<Sport>
  round: UseState<Round>
  matchNumber: UseState<number>
}

export type PageStatus =
  | 'no-one'
  | 'one-in'
  | 'both-in'
  | 'completed'
  | 'in-progress'
