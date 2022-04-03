import { AuthenticatedPages } from '@/types/navigation'
import { TimeApiProps } from '@/types/index'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import MapView from 'react-native-maps'
import { MutableRefObject, RefObject } from 'react'

export type SOARTimetable = Array<{
  time: string
  groupTitle: string
}>

type SOARLocationStatus = '' | 'next' | 'done'

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
  coordinate: {
    latitude: number
    longitude: number
  }
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

export type UseState<Type> = [Type, Dispatch<SetStateAction<Type>>]

export type SOARContextProps = {
  loadingState: UseState<boolean>
  scanningState: UseState<boolean>
  locationState: UseState<Array<SOARLocation>>
  stationOrderState: UseState<StationOrderProps>
  filteredState: UseState<SOARFilterProps>
  QRState: UseState<QRCommandProps>
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

export type SOARTimestamp = {
  timestamp: TimeApiProps
  QR: QRCommandProps
}

export type SOARTeamData = SOARStartState &
  SOAREndState & {
    timerRunning: boolean
    allEvents: Array<SOARTimestamp>
    direction: 'A' | 'B'
    points: number
    stationsCompleted: Array<string>
    stationsRemaining: Array<string>
  }

/* Map and SOAR */

export type MapButtonProps = {
  style?: any
  icon: any
  onPress: any
  activated?: any
}

export type MapProps = {
  // getCurrentLocation: any
  mapRef: MutableRefObject<MapView | null>
  navigation: DrawerNavigationProp<AuthenticatedPages, 'SOARScreen'>
  displayLocations: Array<SOARLocation>
  startStatus: boolean
}
