import { View, ViewStyle, StyleSheet } from 'react-native'
import { globalStyles } from '@/styles/global'
import { ReactNode } from 'react'

const NoTouchDiv = (props: { style?: ViewStyle; children?: ReactNode }) => {
  return (
    <View
      style={props.style}
      pointerEvents="box-none"
      children={props.children}
    />
  )
}

const Overlap = (props: { style?: ViewStyle; children?: ReactNode }) => {
  const _style = StyleSheet.flatten([
    globalStyles.container.overlap,
    props.style,
  ])
  return <NoTouchDiv style={_style} children={props.children} />
}

export { NoTouchDiv, Overlap }
