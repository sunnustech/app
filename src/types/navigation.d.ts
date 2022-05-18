import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AuthenticatedPages = {
  HomeScreen: undefined
  NotificationScreen: undefined
  SOARNavigator: undefined
  TSSNavigator: undefined
  WSSScreen: undefined
  GeneratorScreen: undefined
  DEVScreen: undefined
}

export type UnauthenticatedPages = {
  Unauthenticated: undefined
  Authenticated: undefined
  Splash: undefined
}

export type TSSPages = {
  TSSScreen: undefined
  TSSKnockoutTable: undefined
  TSSScheduleScreen: undefined
}

export type SOARPages = {
  SOARScreen: undefined
  QRScreen: undefined
}

export type AuthPageNavigator = NativeStackNavigationProp<
  AuthenticatedPages,
  keyof AuthenticatedPages
>

export type AuthPage<Route extends keyof AuthenticatedPages> =
  NativeStackNavigationProp<AuthenticatedPages, Route>

export type TSSPage<Route extends keyof TSSPages> = BottomTabNavigationProp<
  TSSPages,
  Route
>

export type SOARPage<Route extends keyof SOARPages> = NativeStackNavigationProp<
  SOARPages,
  Route
>
