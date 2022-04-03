import { DrawerNavigationProp } from '@react-navigation/drawer'

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
  Unauthenticated: undefined
  Authenticated: undefined
}

export type AuthPage<Route extends keyof AuthenticatedPages> =
  DrawerNavigationProp<AuthenticatedPages, Route>
