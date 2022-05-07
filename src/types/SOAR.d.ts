import { AuthenticatedPages, SOARPage } from '@/types/navigation'
import { TimeApiProps } from '@/types/index'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import MapView from 'react-native-maps'
import { MutableRefObject, RefObject } from 'react'

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

type SOARScores =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'

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
  | SOARScores

export type QRDictionaryGeneratorProps = {
  command: SOARCommand
  station: string
  facilitator?: string
  points?: number
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
  allEvents: Array<SOARTimestamp>
  direction: 'A' | 'B'
  points: number
}

/* Map and SOAR */

export type MapButtonProps = {
  style?: any
  icon: any
  onPress: any
  activated?: any
}

/* some constants */
type SOARNavigator = SOARPage<'SOARScreen'>
type StationStatus = 'done' | 'next' | ''
// TODO: standardize all pointType and stationType variable names
type PointType = 'game' | 'water' | 'admin'
type NavTarget = keyof AuthenticatedPages

export type MapProps = {
  mapRef: MutableRefObject<MapView | null>
  navigation: SOARNavigator
  displayLocations: Array<SOARLocation>
  startStatus: boolean
}

export type MapPointProps = {
  navigation: SOARNavigator
  coordinate: Coordinate
  navTarget: NavTarget
  content: string
  pointType: PointType
  status: StationStatus
}

export type MapPointPopupProps = {
  navigation: SOARNavigator
  navTarget: NavTarget
  content: string
  status: StationStatus
}

export type MapPointIconProps = {
  status: StationStatus
  pointType: PointType
}

export type SOARStations = [
  'Slide',
  'Sotong Houze',
  'Nerf Battle',
  'Snake and Ladders',
  'GOLF',
  'Relay2Maze',
]

export type SOARActions = [
  'start',
  'pause',
  'resume',
  'stopFinal',
  'completeStage',
]

// Placeholder
export type SOARFacilitators = ['khang', 'benjy']

// For SOAR QR to use custom picker
export type QRField = 'event' | 'action' | 'facilitator' | 'score'
export type QRFieldStates = {
  event: UseState<SOARStations>
  action: UseState<SOARActions>
  facilitator: UseState<SOARFacilitators>
  score: UseState<SOARScores>
}