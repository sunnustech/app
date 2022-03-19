import { KeyboardAvoidingView, Text, View } from 'react-native'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { DEV as styles } from '@/styles/fresh'
import DebugButtons from './DebugButtons'

const DEVScreen = () => {
  const navigation = useNavigation<DNP<DrawerPages, 'DEV'>>()

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the DEV page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
      <View style={{ width: '60%' }}>
        <DebugButtons />
      </View>
    </KeyboardAvoidingView>
  )
}

export default DEVScreen
