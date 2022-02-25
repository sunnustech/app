import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'

/* firebase */
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

/* navigation */
import { StackPages } from '@/lib/navigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import styles from '@/styles/main'
import { Button } from '@/components/Buttons'
import { Input, SecureInput } from '@/components/Inputs'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<NSNP<StackPages, 'Login'>>()

  useEffect(() => {
    const onListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home')
      }
    })
    return onListener
  }, [])

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log('successful login as:', credential.user.email)
      })
      .catch((err) => console.log(err))
  }

  /* for devs to log in quickly;
   * to be removed from production build
   */
  const breakInHandler = () => {
    signInWithEmailAndPassword(auth, 'sunnus@gmail.com', 'test1234')
      .then((credential) => {
        console.log('successful login as:', credential.user.email)
      })
      .catch((err) => console.log(err))
  }

  return (
    <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <SecureInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={loginHandler}>Login</Button>
        <Button onPress={breakInHandler}>Break In</Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
