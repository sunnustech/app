import { DrawerNavigationProp } from '@react-navigation/drawer'

/* Authentication */
export type UserState = {
  isLoggedIn: boolean
  isRegistered: boolean
}

/* Navigation Pages */
export type AuthenticatedPages = {
  HomeScreen: undefined
  SOARScreen: undefined
  TSSScreen: undefined
  WSSScreen: undefined
  DEVScreen: undefined
  KnockoutTableScreen: undefined
  TimerScreen: undefined
  QRScreen: undefined
}

export type UnauthenticatedPages = {
  Login: undefined
  Home: undefined
}
