import { DrawerNavigationProp } from '@react-navigation/drawer'

/* Authentication */
export type UserState = {
  isLoggedIn: boolean
  isRegistered: boolean
}

/* Navigation Pages */
export type DrawerPages = {
  HomeScreen: undefined
  SOAR: undefined
  TSS: undefined
  WSS: undefined
  DEV: undefined
  KnockoutTable: undefined
  TimerScreen: undefined
  QRScreen: undefined
}

export type StackPages = {
  Login: undefined
  Home: undefined
}

/* Page Props */
export type SOARPageProps = DrawerNavigationProp<DrawerPages, 'SOAR'>
