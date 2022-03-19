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

export type DebugButtonProps = ButtonProps & {
  color?: string
}
