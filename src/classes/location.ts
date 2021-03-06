import { Team } from '@/classes/team'
import { LocationStatus, LocationType } from '@/types/SOAR'

type InitLocation = {
  details: string
  gameTitle: string
  googleMapPinUrl: string
  id: number
  latitude: number
  longitude: number
  site: string
  type: LocationType
}

export class Location {
  details: string
  gameTitle: string
  googleMapPinUrl: string
  id: number
  latitude: number
  longitude: number
  site: string
  status: LocationStatus
  type: LocationType
  static empty = new Location({
    details: '',
    gameTitle: '',
    googleMapPinUrl: '',
    id: 0,
    latitude: 0,
    longitude: 0,
    site: '',
    type: '',
  })
  // constructor values can be read directly from csv
  public constructor(props: InitLocation) {
    this.details = props.details
    this.gameTitle = props.gameTitle
    this.googleMapPinUrl = props.googleMapPinUrl
    this.id = props.id
    this.latitude = props.latitude
    this.longitude = props.longitude
    this.site = props.site
    this.status = 'hidden'
    this.type = props.type
  }
  isEmpty(): boolean {
    const values = Object.values(this)
    return values.every((v) => v === '')
  }
  setStatus(status: LocationStatus) {
    this.status = status
  }
  getCoordinates() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    }
  }
}

export class LocationList {
  list: Location[]
  public constructor(gameStations: Location[]) {
    this.list = gameStations
  }
  update(team: Team) {
    this.list.forEach((loc) => {
      loc.status = 'hidden'
      if (loc.gameTitle === team.nextStation()) {
        loc.status = 'next'
      } else if (team._stationsCompleted.includes(loc.gameTitle)) {
        loc.status = 'done'
      }
    })
  }
}
