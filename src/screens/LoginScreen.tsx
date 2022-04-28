import { useState } from 'react'
import { View } from 'react-native'
import colors from '@/styles/colors'

/* firebase */
import { signInWithEmailAndPassword } from 'firebase/auth'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { login as styles } from '@/styles/fresh'
import { ScrollView } from 'react-native-gesture-handler'
import Sunnus from '@/components/svgs/Sunnus'
import {
  Loader,
  LoginInput,
  LoginButton,
  ForgotIdButton,
} from '@/components/login'

const PASSWORD = 'sunnus'

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
          console.debug('successful login as:', credential.user.email) // perma
          setLoading(false)
        })
        .catch((err) => {
          setLoginError(true)
          setLoading(false)
          console.debug(err) // perma
        })
    }
  }

  const forgotHandler = () => {
    console.debug('call forgot password handler')
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
        <LoginInput
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
