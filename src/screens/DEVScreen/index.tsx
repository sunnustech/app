// {{{
import { Text, View, ScrollView } from 'react-native'
/* navigation */
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
// import { MatchRequest } from '@/types/knockout'
import { generateStationQR } from '@/lib/SOAR/QRDictionary'
import colors from '@/styles/colors'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/sunnus/firebase'

/* use this space to hard-code test inputs to functions */

function sendEmail() {
  const school = 'e0725213@u.nus.edu'
  const personal = 'brew4k@gmail.com'
  sendPasswordResetEmail(auth, personal).then(() =>
    console.log('email sent!')
  )
}

/* add button that links to debug function */
const DebugList = () => (
  <>
    <Text>Database</Text>

    <Text>QR Command List</Text>

    <DebugButton onPress={generateStationQR} color={colors.pink[500]}>
      Generate QR (to send to SOAR)
    </DebugButton>

    <Text>Password Reset Email</Text>

    <DebugButton onPress={sendEmail} color={colors.pink[500]}>
      Send Email
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

  // const navigation = useNavigation<AuthPage<'DEVScreen'>>()

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
        </View>
      </ScrollView>
    </View>
  )
}
export default DEVScreen
