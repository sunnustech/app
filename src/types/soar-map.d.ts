import { SOARPageProps } from '@/types/navigation'
import { SOARLocation } from './SOAR'

/* Map and SOAR */

export type MapButtonProps = {
  style?: any
  icon: any
  onPress: any
  activated?: any
}

export type MapProps = {
  // getCurrentLocation: any
  mapRef: any
  navigation: SOARPageProps
  displayLocations: Array<SOARLocation>
}

export type SafeDivProps = {
  style?: any
  children?: any
}

type soarPoint = Array<{
  id: string
  google_map_pin_url: string
  latitude: number
  longitude: number
}>

export type ADMINLocations = {
  medicPoints: soarPoint
  waterPoints: soarPoint
}
