import { Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { buttons as styles } from '@/styles/fresh'
import { ButtonProps, OnPress } from '@/types/index'
import { makeAccent } from '@/styles/utils'
import { Color } from '@/types/colors'
import { ReactElement } from 'react'
import { globalStyles } from '@/styles/global'
import colors from '@/styles/colors'

const Button = ({ onPress, children, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const BaseButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.style]}
    >
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  )
}

const ButtonRed = (props: ButtonProps) => {
  const { style, ...otherProps } = props
  return <Button {...otherProps} style={[styles.redBg, style]} />
}

const ButtonGreen = (props: ButtonProps) => {
  const { style, ...otherProps } = props
  return <Button {...otherProps} style={[styles.greenBg, style]} />
}

type SvgProps = (props: { fill: string }) => ReactElement

export namespace Smashables {
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
  export const Green = (props: ButtonProps) => {
    const { style, ...otherProps } = props
    return (
      <Button
        {...otherProps}
        style={[{ backgroundColor: colors.green[500] }, style]}
      />
    )
  }
  export const Red = (props: ButtonProps) => {
    const { style, ...otherProps } = props
    return (
      <Button
        {...otherProps}
        style={[{ backgroundColor: colors.red[500] }, style]}
      />
    )
  }
}

export { Button, ButtonRed, ButtonGreen }
