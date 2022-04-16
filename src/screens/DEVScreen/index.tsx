// {{{
import { Text, View, ScrollView } from 'react-native'
/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
/* sunnus components */
import { DEV as styles } from '@/styles/fresh'
import DebugButton from './DebugButton'
// }}}

/*
 * Hey devs, to add your own debug function, simply create a new instance of
 * DebugButton below and put your intended function to call inside the onPress
 * property.
 */

/* debug functions */
import { resetTSS, handleMatch, getKnockoutTable } from '@/lib/knockout'
import SOAR from '@/lib/SOAR'
// import { MatchRequest } from '@/types/knockout'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'
import { generateStationQR } from '@/lib/SOAR/QRDictionary'
import { SOARContext } from '@/contexts/SOARContext'
import { QRCommands as q } from '@/lib/SOAR/QRCommands'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '@/sunnus/firebase'
import colors from '@/styles/colors'

/* use this space to hard-code test inputs to functions */

function createUser() {
  createUserWithEmailAndPassword(auth, 'auto-user2@gmail.com', 'sunnus')
}

function resetPassword() {
  console.log('resetting password...')
  const email = 'e0725213@u.nus.edu'
  sendPasswordResetEmail(auth, email).then((e) => {
    console.log('email sent!', e, email)
  })
}

/* add button that links to debug function */
const DebugList = () => (
  <>
    <Text>Database</Text>

    <Text>Knockout Table</Text>

    <DebugButton onPress={resetTSS} color={colors.pink[500]}>
      Reset TSS Data
    </DebugButton>
    <DebugButton onPress={getKnockoutTable} color={colors.pink[500]}>
      Get Knockout Table
    </DebugButton>

    <Text>QR Command List</Text>

    <DebugButton onPress={generateStationQR} color={colors.pink[500]}>
      Generate QR (to send to SOAR)
    </DebugButton>
  </>
)

/*
 * once you've imported the function and added a button, simply go to the
 * developer page on the app itself and press your newly created button to run
 * the function!
 */

const DEVScreen = () => {
  /* these three lines attaches a listener to participants/Dev_loper and
   * re-runs each time there is a change detect on server-side
   */
  // const firebaseListener = onSnapshot(
  //   doc(db, 'participants', 'Dev_loper'),
  //   (doc) => {
  //     console.log('current data: ', doc.data())
  //   }
  // )

  const { userId, teamName, schedule } = useContext(UserContext)
  const { QRState } = useContext(SOARContext)
  const QR = QRState[0]
  const getContext = () => {
    console.log('trying to fetch...') // perma
    console.log('userId:', userId) // perma
    console.log('team:', teamName) // perma
    console.log('schedule:', schedule) // perma
  }

  const navigation = useNavigation<AuthPage<'DEVScreen'>>()

  const testStart = new Date(2022, 3, 6, 11)

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text>Welcome to the DEV page!</Text>
        <Text>(you can navigate back by swiping in from the left)</Text>
        <View style={{ width: '60%', marginTop: 32 }}>
          <DebugList />

          <Text>SOAR functions (team name: Dev_loper)</Text>

          <DebugButton
            onPress={() => SOAR.start('Dev_loper', q.start)}
            children="start"
          />

          <DebugButton
            onPress={() => SOAR.pause('Dev_loper', q.pause)}
            children="pause"
          />

          <DebugButton
            onPress={() => SOAR.resume('Dev_loper', q.resume)}
            children="resume"
          />

          <DebugButton
            onPress={() => SOAR.stopFinal('Dev_loper', q.stopFinal)}
            children="stopFinal"
          />

          <Text>User Context Testing</Text>

          <DebugButton onPress={getContext} color={colors.pink[500]}>
            Get User + Team Context
          </DebugButton>

          <Text>User Creation Testing</Text>

          <DebugButton onPress={createUser} color={colors.pink[500]}>
            Create a new user
          </DebugButton>

          <DebugButton onPress={resetPassword} color={colors.pink[500]}>
            Reset Password
          </DebugButton>
        </View>
      </ScrollView>
    </View>
  )
}
export default DEVScreen
