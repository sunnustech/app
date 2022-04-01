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

export type QRStaticCommandProps = {
  title: string
  summary: string
  action: string
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
