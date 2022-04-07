import { ReactNode } from 'react'
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'

/* Authentication */
export type UserState = {
  isLoggedIn: boolean
  isRegistered: boolean
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

export type SafeDivProps = {
  style?: any
  children?: any
}

export type ButtonProps = Pick<
  TouchableOpacityProps,
  'onPress' | 'children' | 'style'
>

export type DebugButtonProps = ButtonProps & {
  color?: string
}
