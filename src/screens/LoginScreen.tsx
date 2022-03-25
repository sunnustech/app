import { useContext, useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import SunnusLogo from '../../assets/sunnus-anniversary.png'

/* firebase */
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '@/sunnus/firebase'
import { collection, getDocs, query } from 'firebase/firestore'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { login as styles } from '@/styles/fresh'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../contexts/UserContext'

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
  const { userid, setUserid, team, setTeam } = useContext(UserContext)
  const [loginid, setLoginid] = useState('')
  const [loginError, setLoginError] = useState(false)

  const loginHandler = async () => {
    const email = queryEmailFromFirebase()
    if (email) {
      signInWithEmailAndPassword(auth, await email, PASSWORD)
        .then((credential) => {
          console.log('successful login as:', credential)
        })
        .catch((err) => {
          setLoginError(true)
          console.log(err)
        })
    }
  }

  const queryEmailFromFirebase = async () => {
    const userRef = query(collection(db, 'participants'))
    const querySnapshot = await getDocs(userRef)
    let email = ''
    querySnapshot.forEach((doc) => {
      const teamData = doc.data()
      const teamDetails = teamData.members
      if (teamDetails) {
        for (let i = 0; i < teamDetails.length; i++) {
          if (teamDetails[i].loginid === loginid) {
            email = teamDetails[i].email         
          }
        }
      }
    })
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
          value={loginid}
          onChangeText={(text: string) => setLoginid(text)}
        />
      </View>
      <View>
        <Text style={styles.errorMessage}>
          {loginError ? 'Sorry, but this username does not exist!' : ''}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={forgotHandler}>
          <Text style={styles.buttonText}>Forgot ID?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={breakInHandler}>
          <Text style={styles.buttonText}>Break In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default LoginScreen
