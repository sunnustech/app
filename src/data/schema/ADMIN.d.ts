export type ADMINLocation = {
    id: number
    booth_title: string
    google_map_pin_url: string
    latitude: number
    longitude: number
}

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type ADMINData = {
  locationList: {
    [key: string]: ADMINLocation
  }
}
