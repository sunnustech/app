import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInput
} from 'react-native'
import { login as styles } from '@/styles/fresh'

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
  // secureTextEntry
  return (
    <TextInput
      contextMenuHidden={true}
      returnKeyType="go"
      onSubmitEditing={onSubmitEditing}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  )
}

export default LoginInput
