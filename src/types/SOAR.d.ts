import { SOARPageProps } from '@/types/navigation'

export type SOARTimetable = Array<{
  time: string
  group_title: string
}>

export type SOARLocation = {
  title: string
  id: number
  type: string
  location: string
  game_title: string
  phyiscal: boolean
  details: string
  google_map_pin_url: string
  timetable: SOARTimetable
  coordinate: {
    latitude: number
    longitude: number
  }
  stage: number
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

export type QRMapProps = {
  command: string
  summary: string
  action: string
}
