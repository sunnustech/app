import { TextInput } from 'react-native'
import styles from '../styles/main'

type InputTypes = {
  value: string
  onChangeText: (text: string) => void,
  placeholder: string
}

const Input = ({ value, onChangeText, placeholder }: InputTypes) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  )
}

const SecureInput = ({ value, onChangeText, placeholder }: InputTypes) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      secureTextEntry
    />
  )
}

export { Input, SecureInput }
