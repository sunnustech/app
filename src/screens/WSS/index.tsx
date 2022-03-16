import { KeyboardAvoidingView, Text } from 'react-native'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { WSS as styles } from '@/styles/fresh'
import { notificationInit } from '@/lib/notifications'

const WSSScreen = () => {
  notificationInit()
  const navigation = useNavigation<DNP<DrawerPages, 'WSS'>>()

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the WSS page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
    </KeyboardAvoidingView>
  )
}

export default WSSScreen
