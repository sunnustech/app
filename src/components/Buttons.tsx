import { Text, TouchableOpacity } from 'react-native'
import { buttons as styles } from '@/styles/fresh'
import { ButtonProps } from '@/types/index'

const Button = ({ onPress, children, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
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

export { Button, ButtonRed, ButtonGreen }
