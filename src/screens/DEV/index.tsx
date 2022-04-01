// {{{
import { Text, View, ScrollView } from 'react-native'
/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'
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
import soar from '@/lib/soar'
// import { MatchRequest } from '@/types/knockout'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { generateQR } from '@/data/commandMap'

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

    <Text>SOAR functions (team name: Known_Painters)</Text>

    <DebugButton
      onPress={() => soar.start('Known_Painters')}
      children="start"
    />

    <DebugButton
      onPress={() => soar.pause('Known_Painters')}
      children="pause"
    />

    <DebugButton
      onPress={() => soar.resume('Known_Painters')}
      children="resume"
    />

    <DebugButton
      onPress={() => soar.stopFinal('Known_Painters')}
      children="stopFinal"
    />

    <Text>User Context Testing</Text>
  </>
)

/*
 * once you've imported the function and added a button, simply go to the
 * developer page on the app itself and press your newly created button to run
 * the function!
 */

// {{{
const DEVScreen = () => {
  const { userId, team, schedule } = useContext(UserContext)
  const getContext = () => {
    console.log('trying to fetch...') // perma
    console.log('userId:', userId) // perma
    console.log('team:', team) // perma
    console.log('schedule:', schedule) // perma
  }
  const navigation = useNavigation<DNP<DrawerPages, 'DEV'>>()
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
          <DebugButton onPress={getContext} color="#ec4899">
            Get User + Team Context
          </DebugButton>
        </View>
      </ScrollView>
    </View>
  )
}
export default DEVScreen
// }}}
