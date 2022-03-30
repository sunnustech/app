import { SOARPageProps } from '@/types/navigation'

/* Map and SOAR */

export type MapButtonProps = {
  style?: any
  icon: any
  onPress: any
}

export type MapProps = {
  getCurrentLocation: any
  navigation: SOARPageProps
  filterLocations: any
}

export type SafeDivProps = {
  style?: any
  children?: any
}
