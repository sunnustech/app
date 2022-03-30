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
import { MatchRequest } from '@/lib/knockout.d'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

/* use this space to hard-code test inputs to functions */

function _handleMatch() {
  const outcome: MatchRequest = {
    sport: 'dodgeball',
    round: 'semifinals',
    matchNumber: 1,
    winner: 'A',
  }
  handleMatch(outcome)
}

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
    <DebugButton onPress={handleMatch} color="#ec4899">
      Handle Match
    </DebugButton>
    <DebugButton onPress={getKnockoutTable} color="#ec4899">
      Get Knockout Table
    </DebugButton>
  </>
)

/*
 * once you've imported the function and added a button, simply go to the
 * developer page on the app itself and press your newly created button to run
 * the function!
 */

// {{{
const DEVScreen = () => {
  const { userid, team, schedule } = useContext(UserContext)
  const getContext = () => {
    console.log('trying to fetch...') // perma
    console.log('userid:', userid) // perma
    console.log('team:', team) // perma
    console.log('schedule:', schedule) // perma
  }
  const navigation = useNavigation<DNP<DrawerPages, 'DEV'>>()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Welcome to the DEV page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
      <View style={{ width: '60%', marginTop: 32 }}>
        <DebugList />
        <DebugButton onPress={getContext} color="#ec4899">
          Get User + Team Context
        </DebugButton>
      </View>
    </ScrollView>
  )
}
export default DEVScreen
// }}}
