import { Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { buttons as styles } from '@/styles/fresh'
import { ButtonProps, OnPress } from '@/types/index'
import { makeAccent } from '@/styles/utils'
import { Color } from '@/types/colors'
import { ReactElement } from 'react'
import { globalStyles } from '@/styles/global'
import colors from '@/styles/colors'

export const Button = (props: ButtonProps & { color?: Color }) => {
  const _color = props.color || 'white'
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: colors[_color][500] }]}
    >
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  )
}

type SvgProps = (props: { fill: string }) => ReactElement

export const Series = (
  props: ViewProps & { color: Color; onPress: OnPress; svg: SvgProps }
) => {
  const accent = makeAccent(props.color)

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        globalStyles.button.series.base,
        {
          backgroundColor: accent.bg,
          borderColor: accent.border,
        },
      ]}
    >
      <View style={globalStyles.container.series}>
        <props.svg fill={accent.fg} />
      </View>
    </TouchableOpacity>
  )
}
