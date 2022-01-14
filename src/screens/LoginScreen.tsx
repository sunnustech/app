import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'

/* firebase */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

/* navigation */
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '../../firebase'
import styles from '../styles/main'
import { Button, ButtonOutlined } from '../components/Buttons'
import { Input, SecureInput } from '../components/Inputs'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<NSNP<RootStackParamList, 'Login'>>()

  useEffect(() => {
    const onListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home')
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

  const signupHandler = () => {
    console.log(email, password)
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user
    //     console.log(user)
    //   })
    //   .catch((err) => console.log(err))
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
        <ButtonOutlined onPress={signupHandler}>Sign Up</ButtonOutlined>
        <Button onPress={breakInHandler}>Break In</Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
