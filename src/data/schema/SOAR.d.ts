export type SOARTimetable = Array<{
  time: string
  group_title: string
}>

export type SOARLocation = {
  location: string
  game_title: string
  phyiscal: boolean
  details: string
  google_map_pin_url: string
  timetable: SOARTimetable
}

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type SOARData = {
  locationList: {
    [key: string]: SOARLocation
  }
}
