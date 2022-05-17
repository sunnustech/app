import { View } from 'react-native'

export const VSpacer = (props: { h: number }) => (
  <View style={{ height: props.h }} />
)

export const HSpacer = (props: { w: number }) => (
  <View style={{ width: props.w }} />
)
