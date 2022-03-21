import { SOARPageProps } from '@/types/navigation'

/* Map and SOAR */

export type SOARContextProps = {
  loading: boolean
  filterLocations: GameStation[]
  updateFilterLocations: React.Dispatch<React.SetStateAction<GameStation[]>>
  gameLocations: GameStation[]
  updateGameLocations: React.Dispatch<React.SetStateAction<GameStation[]>>
  adminLocations: GameStation[]
  updateAdminLocations: React.Dispatch<React.SetStateAction<GameStation[]>>
}

export type MapButtonProps = {
  style?: any
  icon: any
  onPress: any
}

export type MapProps = {
  ref: any
  getCurrentLocation: any
  navigation: SOARPageProps
  filterLocations: any
}

export type SafeDivProps = {
  style?: any
  children?: any
}
