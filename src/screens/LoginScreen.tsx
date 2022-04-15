import { useState } from 'react'
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native'
import colors from '@/styles/colors'

/* firebase */
import { signInWithEmailAndPassword } from 'firebase/auth'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { login as styles } from '@/styles/fresh'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Sunnus from '@/components/svgs/Sunnus'
import { OnPress } from '@/types/index'

const PASSWORD = 'sunnus'

const Input = ({
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

const LoginErrorMessage = ({ error }: { error: boolean }) => {
  return error ? (
    <Text style={styles.errorMessage}>
      Sorry, but this username does not exist!
    </Text>
  ) : null
}

const Loader = (props: { loading: boolean; error: boolean }) => {
  return (
    <View style={styles.spacer}>
      {props.error && !props.loading ? (
        <LoginErrorMessage error={props.error} />
      ) : (
        <ActivityIndicator
          animating={props.loading}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  )
}

const LoginScreen = () => {
  const [loginId, setLoginId] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const loginHandler = () => {
    setLoading(true)
    setLoginError(false)
    const email = `${loginId}@sunnus.com`
    if (email) {
      signInWithEmailAndPassword(auth, email, PASSWORD)
        .then((credential) => {
          console.log('successful login as:', credential.user.email) // perma
          setLoading(false)
        })
        .catch((err) => {
          setLoginError(true)
          setLoading(false)
          console.log(err) // perma
        })
    }
  }

  const forgotHandler = () => {
    console.log('call forgot password handler')
    // https://firebase.google.com/products/extensions/firebase-firestore-send-email
  }

  return (
    <ScrollView
      contentContainerStyle={styles.loginContainer}
      scrollEnabled={false}
    >
      <Sunnus fill={colors.gray[600]} height={32} width="100%" />
      <View style={styles.spacer} />
      <View style={styles.inputContainer}>
        <Input
          secureTextEntry={false}
          placeholder="User ID"
          value={loginId}
          onChangeText={(text: string) => setLoginId(text)}
          onSubmitEditing={loginHandler}
        />
      </View>
      <Loader loading={loading} error={loginError} />
      <View style={styles.buttonContainer}>
        <LoginButton onPress={loginHandler} loading={loading} />
        <ForgotIdButton
          onPress={forgotHandler}
          loading={loading}
          enabled={false}
        />
      </View>
    </ScrollView>
  )
}

export default LoginScreen
