import { KeyboardAvoidingView, Text } from 'react-native'

/* navigation */
import { AuthenticatedPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { WSS as styles } from '@/styles/fresh'

const WSSScreen = () => {
  const navigation = useNavigation<DNP<AuthenticatedPages, 'WSSScreen'>>()

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the WSS page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
    </KeyboardAvoidingView>
  )
}

export default WSSScreen
