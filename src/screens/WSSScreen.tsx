import { SafeAreaView, Text, View } from 'react-native'
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import BackButton from '@/components/BackButton'
import { globalStyles } from '@/styles/global'

const WSSScreen = () => {
  const navigation = useNavigation<AuthPage<'WSSScreen'>>()

  return (
    <SafeAreaView style={globalStyles.WSS.outerContainer}>
      <BackButton navigation={navigation} text="Water Sports Series" />
      <View style={globalStyles.WSS.container}>
        <Text>Welcome to the WSS page!</Text>
      </View>
    </SafeAreaView>
  )
}

export default WSSScreen
