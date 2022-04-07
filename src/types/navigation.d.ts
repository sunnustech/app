import { DrawerNavigationProp } from '@react-navigation/drawer'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type AuthenticatedPages = {
  HomeScreen: undefined
  SOARScreen: undefined
  TSSNavigator: undefined
  WSSScreen: undefined
  GeneratorScreen: undefined
  DEVScreen: undefined
  KnockoutTableScreen: undefined
  TimerScreen: undefined
  QRScreen: undefined
}

export type UnauthenticatedPages = {
  Unauthenticated: undefined
  Authenticated: undefined
}

export type TSSPages = {
  TSSScreen: undefined
  TSSKnockoutTable: undefined
}

export type AuthPage<Route extends keyof AuthenticatedPages> =
  DrawerNavigationProp<AuthenticatedPages, Route>

export type TSSPage<Route extends keyof TSSPages> =
  BottomTabNavigationProp<TSSPages, Route>
