import { KeyboardAvoidingView, Text } from 'react-native'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'
import { notificationInit } from '@/lib/notifications'

const TSSScreen = () => {
  notificationInit()
  const navigation = useNavigation<DNP<DrawerPages, 'TSS'>>()

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
