/*
 * Authentication
 */

export type UserState = {
  isLoggedIn: boolean
  isRegistered: boolean
}

export type ButtonProps = {
  onPress: any
  children: string
}

export type DebugButtonProps = ButtonProps & {
  color?: string
}

/*
 * Utilities
 */

type TimeApiProps = {
  date: string
  dateTime: string
  day: number
  dayOfWeek: string
  dstActive: boolean
  hour: number
  milliseconds: number
  minute: number
  month: number
  seconds: number
  time: string
  timeZone: string
  year: number
}
