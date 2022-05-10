import { LocationStatus } from '@/types/SOAR'

type LocationProps = {
  googleMapPinUrl: string
  id: number
  location: string
  stationType: string
  status: LocationStatus
  name: string
  gameTitle: string
  details: string
  latitude: number
  longitude: number
}

export class Location {
  googleMapPinUrl: string
  id: number
  location: string
  stationType: string
  status: LocationStatus
  name: string
  gameTitle: string
  details: string
  latitude: number
  longitude: number
  static empty = new Location({
    googleMapPinUrl: '',
    id: 0,
    location: '',
    stationType: '',
    status: '',
    name: '',
    gameTitle: '',
    details: '',
    latitude: 0,
    longitude: 0,
  })
  // constructor values can be read directly from csv
  public constructor(props: LocationProps) {
    this.googleMapPinUrl = props.googleMapPinUrl
    this.id = props.id
    this.location = props.location
    this.stationType = props.stationType
    this.status = props.status
    this.name = props.name
    this.gameTitle = props.gameTitle
    this.details = props.details
    this.latitude = props.latitude
    this.longitude = props.longitude
  }
  isEmpty(): boolean {
    const values = Object.values(this)
    return values.every((v) => v === '')
  }
}
