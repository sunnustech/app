import { KeyboardAvoidingView, Text } from 'react-native'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { Button } from '../components/Buttons'
import { getKnockoutTable } from '../lib/knockout'
import { Sport } from '../types/TSS'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/sunnus/firebase'

const TSSScreen = () => {

  const s: Sport = 'dodgeball' as Sport

  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScreen'>>()
  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScren'>>()

  const navigation = useNavigation<AuthPage<'TSSScreen'>>()

  const tempFunction = async () => {
    await getDoc(doc(db, 'TSS', 'dodgeball'))
    .then((doc) => {
      const docData = doc.data()
      if (docData) {
        console.log(docData['semifinals'][0])
      }
    })
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
