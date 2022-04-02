import { SOARPageProps } from '@/types/navigation'
import { TimeApiProps } from '@/types/index'

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

export type StationOrderProps = {
  A: Array<string>
  B: Array<string>
}

export type UseState<Type> = [Type, Dispatch<SetStateAction<Type>>]

export type SOARContextProps = {
  loadingState: [boolean, Dispatch<SetStateAction<boolean>>]
  scanningState: [boolean, Dispatch<SetStateAction<boolean>>]
  locationState: [Array<any>, Dispatch<SetStateAction<Array<any>>>]
  stationOrderState: UseState<StationOrderProps>
  filteredState: [any, Dispatch<SetStateAction<any>>]
  QRState: [
    QRStaticCommandProps,
    Dispatch<SetStateAction<QRStaticCommandProps>>
  ]
}

type SOARStartState =
  | {
      started: true
      startTime: TimeApiProps
      lastPause: TimeApiProps
      lastResume: TimeApiProps
    }
  | {
      started: false
      startTime: {}
      lastPause: {}
      lastResume: {}
    }

type SOAREndState =
  | {
      stopped: true
      stopTime: TimeApiProps
    }
  | {
      stopped: false
      stopTime: {}
    }

export type SOARTeamData = SOARStartState &
  SOAREndState & {
    timerRunning: boolean
    timerEvents: Array<TimeApiProps>
    direction: 'A' | 'B'
    points: number
    stationsCompleted: Array<string>
  }
