import { SafeAreaView, Text, View } from 'react-native'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { WSS as styles } from '@/styles/fresh'
import BackButton from '@/components/BackButton'

const WSSScreen = () => {
  const navigation = useNavigation<AuthPage<'WSSScreen'>>()

  return (
    <SafeAreaView style={styles.outerContainer}>
      <BackButton navigation={navigation} text="Water Sports Series" />
      <View style={styles.container}>
        <Text>Welcome to the WSS page!</Text>
      </View>
    </SafeAreaView>
  )
}

export default WSSScreen
