/*
 * Authentication
 */

export type UserState = {
  isLoggedIn: boolean
  isRegistered: boolean
}

/*
 * Navigation Pages
 */
export type DrawerPages = {
  HomeScreen: undefined
  MapScreen: undefined
  NotificationScreen: undefined
  DatabaseScreen: undefined
  ScanScreen: undefined
  SampleSoarGamePage: undefined
  ScoreboardScreen: undefined
  KnockoutTable: undefined
  KnockoutTree: undefined
  // Just a TEST, will be deleted or refined later
  DummyTest: undefined
}

export type StackPages = {
  Login: undefined
  Home: undefined
}