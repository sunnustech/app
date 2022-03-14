import { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import SunnusLogo from '../../assets/sunnus-anniversary.png'

/* firebase */
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

/* navigation */
import { StackPages } from '@/lib/navigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { login as styles } from '@/styles/fresh'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

const LoginButton = ({ loginHandler }: { loginHandler: any }) => {
  return (
    <TouchableOpacity onPress={loginHandler} style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  )
}

const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: {
  [key: string]: any
}) => {
  // secureTextEntry
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  )
}

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <ScrollView
      contentContainerStyle={styles.loginContainer}
      scrollEnabled={false}
    >
      <Image source={SunnusLogo} style={styles.image} />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Team ID + key"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
        {/* <Input */}
        {/*   secureTextEntry */}
        {/*   placeholder="Password" */}
        {/*   value={password} */}
        {/*   onChangeText={(text: string) => setPassword(text)} */}
        {/* /> */}
      </View>
      <View style={styles.buttonContainer}>
        <LoginButton loginHandler={loginHandler} />
        <TouchableOpacity style={styles.button} onPress={breakInHandler}>
          <Text style={styles.buttonText}>Break In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default LoginScreen
