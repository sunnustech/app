import { useState } from 'react'
import { View, ScrollView } from 'react-native'
import colors from '@/styles/colors'

/* firebase */
import { signInWithEmailAndPassword } from 'firebase/auth'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { globalStyles } from '@/styles/global'
import Sunnus from '@/components/svgs/Sunnus'
import { Loader, LoginInput } from '@/components/login'
import { Button } from '../components/Buttons'

const PASSWORD = 'sunnus'

const LoginScreen = () => {
  const [loginId, setLoginId] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  /**
   * Handles user login, firebase requires email and password but for this year we only use loginid
   */
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

  /**
   * Sends an email to the user to reset loginid
   */
  const forgotHandler = () => {
    // https://firebase.google.com/products/extensions/firebase-firestore-send-email
  }

  return (
    <ScrollView
      contentContainerStyle={globalStyles.container.base}
      scrollEnabled={false}
    >
      <Sunnus fill={colors.gray[600]} height={32} width="100%" />
      <View style={{ height: 36 }} />
      <View style={globalStyles.others.inputContainer}>
        <LoginInput
          secureTextEntry={false}
          placeholder="User ID"
          value={loginId}
          onChangeText={(text: string) => setLoginId(text)}
          onSubmitEditing={loginHandler}
        />
      </View>
      <Loader loading={loading} error={loginError} />
      <View style={globalStyles.others.loginButtonContainer}>
        <Button color="amber" onPress={loginHandler} children="Login" />
      </View>
    </ScrollView>
  )
}

export default LoginScreen
