import { KeyboardAvoidingView, Text } from 'react-native'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

const TSSScreen = () => {
  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScreen'>>()
  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScren'>>()

  const navigation = useNavigation<AuthPage<'TSSScreen'>>()

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
