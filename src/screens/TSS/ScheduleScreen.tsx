import { Text, View, SafeAreaView } from 'react-native'

/* navigation */
// import { TSSPage } from '@/types/navigation'
// import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { AuthPage } from '../../types/navigation'
import BackButton from '../../components/BackButton'

const ScheduleScreen = ({
  navigation,
}: {
  navigation: AuthPage<'TSSNavigator'>
}) => {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <BackButton navigation={navigation} text="Schedule" />
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    </SafeAreaView>
  )
}

export default ScheduleScreen
