/*
 * Authentication
 */

export type UserState = {
  isLoggedIn: boolean
  isRegistered: boolean
}

export type ButtonProps = {
  onPress: () => void
  children: string
}
