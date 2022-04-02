import { SOARPageProps } from '@/types/navigation'

export type SOARTimetable = Array<{
  time: string
  groupTitle: string
}>

export type SOARLocation = {
  id: number
  stationType: string
  title: string
  location: string
  content: {
    game_title: string
    details: string
  }
  coordinate: {
    latitude: number
    longitude: number
  }
  timetable: Array<any>
  stage: number
  phyiscal: boolean
  google_map_pin_url: string
}

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type SOARData = {
  locations: {
    data: any
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
export type SoarCommand =
  | 'start'
  | 'pause'
  | 'stopFinal'
  | 'resume'
  | HaventDecided

export type QRStaticCommandProps = {
  title: string
  summary: string
  action: string
  command: SoarCommand
}

export type QRDynamicCommandProps = (points: number) => QRStaticCommandProps

export type SoarTeamProps = {
  timerRunning: boolean
  started: boolean
  stopped: boolean
  startTime: TimeApiProps
  stopTime: TimeApiProps
  timerEvents: Array<TimeApiProps>
  lastPause: TimeApiProps
  lastResume: TimeApiProps
}

export type SOARContextProps = {
  loadingState: [boolean, Dispatch<SetStateAction<boolean>>]
  scanningState: [boolean, Dispatch<SetStateAction<boolean>>]
  locationState: [Array<any>, Dispatch<SetStateAction<Array<any>>>]
  filteredState: [any, Dispatch<SetStateAction<any>>]
  QRState: [
    QRStaticCommandProps,
    Dispatch<SetStateAction<QRStaticCommandProps>>
  ]
}
