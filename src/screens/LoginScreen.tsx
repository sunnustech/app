import { useContext, useState } from 'react'
import {
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import SunnusLogo from '../../assets/sunnus-anniversary.png'

/* firebase */
import { signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '@/sunnus/firebase'
import { collection, getDocs, query } from 'firebase/firestore'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { login as styles } from '@/styles/fresh'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../contexts/UserContext'
import { pullDoc } from '../data/pull'

const PASSWORD = 'sunnus'

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
  const { setUserId, setTeam, setSchedule } = useContext(UserContext)
  const [loginId, setLoginId] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const loginHandler = async () => {
    const email = await queryEmailFromFirebase()
    if (email) {
      signInWithEmailAndPassword(auth, await email, PASSWORD)
        .then((credential) => {
          console.log('successful login as:', credential) // perma
        })
        .catch((err) => {
          setLoginError(true)
          console.log(err) // perma
        })
    }
  }

  const queryEmailFromFirebase = async () => {
    setLoading(true)
    /*
     * pulls a dictionary that maps loginId to groupTitle
     */
    const loginIdDictionary = await pullDoc({
      collection: 'participants',
      doc: 'allLoginIds',
    })
    const registeredUsers = Object.keys(loginIdDictionary.data)
    if (!registeredUsers.includes(loginId)) {
      setLoginError(true)
      setLoading(false)
      return ''
    }
    // continue only if user is registered
    setLoginError(false)
    const user = loginIdDictionary.data[loginId]
    const res2: any = await pullDoc({
      collection: 'participants',
      doc: user.groupTitle,
    })
    const teamData = res2.data
    setUserId(loginId)
    setTeam(user.groupTitle.split('_').join(' '))
    const email = teamData.members[user.index].email
    if (teamData.registeredEvents.TSS) {
      setSchedule(teamData.schedule)
    }
    setLoading(false)
    return email
  }

  const forgotHandler = () => {
    // https://firebase.google.com/products/extensions/firebase-firestore-send-email
  }

  /* for devs to log in quickly;
   * to be removed from production build
   */
  const breakInHandler = () => {
    signInWithEmailAndPassword(auth, 'sunnus@gmail.com', 'test1234')
      .then((credential) => {
        console.log('successful login as:', credential.user.email) // perma
      })
      .catch((err) => console.log(err)) // perma
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
          value={loginId}
          onChangeText={(text: string) => setLoginId(text)}
        />
      </View>
      <ActivityIndicator animating={loading} />
      <View>
        <Text style={styles.errorMessage}>
          {loginError ? 'Sorry, but this username does not exist!' : ''}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={loading ? styles.disabledButton : styles.button}
          disabled={loading}
          onPress={loginHandler}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={loading ? styles.disabledButton : styles.button}
          disabled={loading}
          onPress={forgotHandler}
        >
          <Text style={styles.buttonText}>Forgot ID?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={loading ? styles.disabledButton : styles.button}
          disabled={loading}
          onPress={breakInHandler}
        >
          <Text style={styles.buttonText}>Break In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default LoginScreen
