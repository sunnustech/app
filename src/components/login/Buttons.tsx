import {
  TouchableOpacity,
  Text,
} from 'react-native'
import { login as styles } from '@/styles/fresh'
import { OnPress } from '@/types/index'

const LoginScreenButton = ({
  text,
  onPress,
  loading,
}: {
  text: string
  onPress: OnPress
  loading: boolean
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, loading ? styles.disabledButton : null]}
      disabled={loading}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const LoginButton = (props: { onPress: OnPress; loading: boolean }) => (
  <LoginScreenButton text="Login" {...props} />
)

const ForgotIdButton = (props: {
  onPress: OnPress
  loading: boolean
  enabled: false
}) => {
  return props.enabled ? (
    <LoginScreenButton text="Forgot ID" {...props} />
  ) : null
}

export { LoginButton, ForgotIdButton }
