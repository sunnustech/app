import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles/main'

type ButtonProps = {
  onPress: () => void
  children: string
}

const Button = ({ onPress, children }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const ButtonRed = ({ onPress, children }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styles.redBg]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const ButtonGreen = ({ onPress, children }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styles.greenBg]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const ButtonOutlined = ({ onPress, children }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles.buttonOutline]}
    >
      <Text style={styles.buttonOutlineText}>{children}</Text>
    </TouchableOpacity>
  )
}

export { Button, ButtonRed, ButtonGreen, ButtonOutlined }
