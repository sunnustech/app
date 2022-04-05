import { KeyboardAvoidingView, Text } from 'react-native'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { Button } from '../components/Buttons'
import { getKnockoutTable, handleMatch } from '../lib/knockout'
import { MatchRequest, Sport } from '../types/TSS'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/sunnus/firebase'

const TSSScreen = () => {
  const s: Sport = 'dodgeball' as Sport

  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScreen'>>()
  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScren'>>()

  const navigation = useNavigation<AuthPage<'TSSScreen'>>()

  /* TEST OBJECTS
  let obj: MatchRequest = {
      sport: 'dodgeball',
      matchNumber: 1,
      winner: 'A',
      round: 'round_of_32'
  }

*/
  const tempFunction = async () => {
    let obj: MatchRequest = {
      sport: 'dodgeball',
      matchNumber: 0,
      winner: 'A',
      round: 'round_of_16',
    }
    handleMatch(obj)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
      <Button onPress={tempFunction}>Test</Button>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
