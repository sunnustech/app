import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles/main'

type ButtonProps = {
  onPress: any
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
    <TouchableOpacity onPress={onPress} style={styles.buttonRed}>
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

export { Button, ButtonRed, ButtonOutlined }
