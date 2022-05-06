import {
  SetOptions,
  WriteResult,
  FirestoreDataConverter,
} from '@google-cloud/firestore'

export type SOARTimetable = Array<{
  time: string
  teamName: string
}>

type SOARLocationStatus = '' | 'next' | 'done'

type Coordinate = {
  latitude: number
  longitude: number
}

export type SOARLocation = {
  google_map_pin_url: string
  id: number
  location: string
  physical: boolean
  stage: number
  stationType: string
  status: SOARLocationStatus
  timetable: Array<any>
  title: string
  content: {
    game_title: string
    details: string
  }
  coordinate: Coordinate
}

export type SOARDatabase = {
  locations: {
    data: Array<SOARLocation>
    stationOrder: {
      A: Array<string>
      B: Array<string>
    }
  }
}

type HaventDecided =
  | 'fn01'
  | 'fn02'
  | 'fn03'
  | 'fn04'
  | 'fn05'
  | 'fn06'
  | 'fn07'
  | 'fn08'
  | 'fn09'
  | 'fn10'
  | 'fn11'
  | 'fn12'
  | 'fn13'
  | 'fn14'
  | 'fn15'
  | 'fn16'
  | 'fn17'
  | 'fn18'
  | 'fn19'
  | 'fn20'

export type SOARCommand =
  | 'start'
  | 'pause'
  | 'stopFinal'
  | 'resume'
  | 'TimerNotRunning'
  | 'completeStage'
  | 'WrongStation'
  | 'HaveNotStartedSOAR'
  | 'AlreadyPaused'
  | 'AlreadyResumed'
  | 'AlreadyStartedSOAR'
  | 'AlreadyCompletedSOAR'
  | 'AlreadyCompletedAllStations'
  | 'AlreadyCompletedStation'
  | 'WarnStopFinal'
  | ''
  | HaventDecided

export type QRDictionaryGeneratorProps = {
  command: SOARCommand
  station: string
}

export type QRCommandProps = {
  title: string
  summary: string
  action: string
  points: number
} & QRDictionaryGeneratorProps

export type QRDynamicCommandProps = (points: number) => QRCommandProps

export type StationOrderProps = {
  A: Array<string>
  B: Array<string>
}

export type SOARFilterProps = {
  game: boolean
  water: boolean
  medic: boolean
}

export type SOARTimestamp = {
  timestamp: number
  QR: QRCommandProps
}

export type SOARTeamProps = {
  started: boolean
  stopped: boolean
  startTime: number
  stopTime: number
  timerRunning: boolean
  allEvents: SOARTimestamp[]
  direction: 'A' | 'B'
  points: number
}

export type Sport =
  | 'dodgeball'
  | 'frisbee'
  | 'volleyball'
  | 'tchoukball'
  | 'touchRugby'
  | 'captainsBall'

export type SportProp = Sport | 'more than one' | 'none'

export type Winner = 'A' | 'B' | 'U'

export type Round =
  | 'round_robin'
  | 'round_of_32'
  | 'round_of_16'
  | 'quarterfinals'
  | 'semifinals'
  | 'finals'

export type Series = 'TSS' | 'WSS'

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

export type IncomingHandleMatchRequest = Match & {
  series: Series
  sport: Sport
  matchNumber: number
  round: Round
  facilitatorEmail: string
}

export type ServerMatchRecord = IncomingHandleMatchRequest & {
  timestamp: Date
}

// every thing in namespace Init comes from a csv
// so every type in here should be a subset of string.
declare namespace Init {
  export interface User {
    phoneNumber: string
    email: string
    role: string
    teamName: string
  }
  export interface Team {
    teamName: string
    direction: 'A' | 'B'
    captainsBall: string
    dodgeball: string
    frisbee: string
    tchoukball: string
    touchRugby: string
    volleyball: string
  }
}

export class U {
  realEmail: string
  role: string
  phoneNumber: string
  teamName: string
  email: string
  loginIdNumberPart: string
  loginId: string
  uid: string
  static empty(): User
  static converter: FirestoreDataConverter<User>
  static get(uid: string): Promise<User>
  static set(user: User, options: SetOptions): Promise<WriteResult>
  constructor(props: Init.User)
  isEmpty(): boolean
  setUid(value: string): void
  setLoginId(value: string): void
}

export class Team {
  members: string[]
  teamName: string
  constructor(props: Init.Team)
}

export type Event = {
  group: string
  start: string
  end: string
  sport: Sport
  venue: string
  court: string
  round: Round
  A: string
  B: string
  scoreA: number
  scoreB: number
  idA: string
  idB: string
  completed: boolean
}

type SportConfig = {
  sport: Sport
  matchLength: number
  matchInterval: number
  venue: string
  courts: string[]
  startTime: string
  lunchStart: string
  lunchEnd: string
  alternating: boolean
  density: number
}

export type ScheduleConfig = Record<Sport, SportConfig>
export type RoundRobinConfig = Record<number, number[][]>

/* some shared types for easier future changes */

export type RegisteredEvents = {
  TSS: {
    captainsBall: boolean
    dodgeball: boolean
    frisbee: boolean
    tchoukball: boolean
    touchRugby: boolean
    volleyball: boolean
  }
  SOAR: boolean
}

/* InitializeXYZ will contain the minimum
 * props required to initialize XYZ.
 */

/* some intermediate types that are only used in helper functions */

export type InitializeFirebaseUser = {
  email: string
  emailVerified: false
  password: string
  disabled: false
}

/* the core types that will be extended in sunnus-firestore */

export type InitializeTeam = {
  teamName: string
  registeredEvents: RegisteredEvents
  direction: 'A' | 'B'
}

export type InitializeUser = {
  email: string
  phoneNumber: string
  teamName: string
  role: string
}

/* this serves as a visual map of what firestore looks like.
 * keys are collection names.
 */
export type Firestore = {
  // COLLECTION: Record<string: DOCUMENT>
  teams: Record<string, Team>
  users: Record<string, User>
}
