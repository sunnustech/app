import { DrawerNavigationProp } from '@react-navigation/drawer'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AuthenticatedPages = {
  HomeScreen: undefined
  SOARNavigator: undefined
  TSSNavigator: undefined
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

export type TSSPages = {
  TSSScreen: undefined
  TSSKnockoutTable: undefined
}

export type SOARPages = {
  SOARScreen: undefined
  QRScreen: undefined
}

export type AuthPage<Route extends keyof AuthenticatedPages> =
  DrawerNavigationProp<AuthenticatedPages, Route>

export type TSSPage<Route extends keyof TSSPages> =
  BottomTabNavigationProp<TSSPages, Route>

export type SOARPage<Route extends keyof SOARPages> =
  NativeStackNavigationProp<TSSPages, Route>
