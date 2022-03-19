// {{{
import { Text, View } from 'react-native'
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

/* add button that links to debug function */
const DebugList = () => (
  <DebugButton onPress={writeSchema} color="#22c55e">
    Write Schema
  </DebugButton>
)

/*
 * once you've imported the function and added a button, simply go to the
 * developer page on the app itself and press your newly created button to run
 * the function!
 */

// {{{
const DEVScreen = () => {
  const navigation = useNavigation<DNP<DrawerPages, 'DEV'>>()
  return (
    <View style={styles.container}>
      <Text>Welcome to the DEV page!</Text>
      <Text>(you can navigate back by swiping in from the left)</Text>
      <View style={{ width: '60%' }}>
        <DebugList />
      </View>
    </View>
  )
}
export default DEVScreen
// }}}
