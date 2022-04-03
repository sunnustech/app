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
import writeSchema from '@/data/writeSchema'
import { resetTSS, handleMatch, getKnockoutTable } from '@/lib/knockout'
import SOAR from '@/lib/SOAR'
// import { MatchRequest } from '@/types/knockout'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'
import { generateQR } from '@/lib/SOAR/QRDictionary'
import { SOARContext } from '@/contexts/SOARContext'
import { QRStaticCommands as q } from '@/lib/SOAR/QRStaticCommands'

/* use this space to hard-code test inputs to functions */

/* add button that links to debug function */
const DebugList = () => (
  <>
    <Text>Database</Text>

    <DebugButton onPress={writeSchema} color="#22c55e">
      Write Schema
    </DebugButton>

    <Text>Knockout Table</Text>

    <DebugButton onPress={resetTSS} color="#ec4899">
      Reset TSS Data
    </DebugButton>
    <DebugButton onPress={getKnockoutTable} color="#ec4899">
      Get Knockout Table
    </DebugButton>

    <Text>QR Command List</Text>

    <DebugButton onPress={generateQR} color="#ec4899">
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

          <Text>SOAR functions (team name: Known_Painters)</Text>

          <DebugButton
            onPress={() => SOAR.start('Known_Painters', q.start)}
            children="start"
          />

          <DebugButton
            onPress={() => SOAR.pause('Known_Painters', q.pause)}
            children="pause"
          />

          <DebugButton
            onPress={() => SOAR.resume('Known_Painters', q.resume)}
            children="resume"
          />

          <DebugButton
            onPress={() => SOAR.stopFinal('Known_Painters', q.stopFinal)}
            children="stopFinal"
          />

          <Text>User Context Testing</Text>

          <DebugButton onPress={getContext} color="#ec4899">
            Get User + Team Context
          </DebugButton>
        </View>
      </ScrollView>
    </View>
  )
}
export default DEVScreen
