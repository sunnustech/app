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
  startStatus: boolean
}
