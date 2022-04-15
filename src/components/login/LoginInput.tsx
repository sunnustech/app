import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInput
} from 'react-native'
import { login as styles } from '@/styles/fresh'
import { useState } from 'react'

const LoginInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  onSubmitEditing,
}: {
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  secureTextEntry: boolean
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void
}) => {
  const [focused, setFocused] = useState(false)
  const style = [styles.input, focused ?  styles.inputFocused : null]
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      contextMenuHidden={true}
      returnKeyType="go"
      onSubmitEditing={onSubmitEditing}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={style}
    />
  )
}

export default LoginInput
