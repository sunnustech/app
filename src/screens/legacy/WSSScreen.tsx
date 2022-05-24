// retired scren, used to be event page for WSS

import { SafeAreaView, Text, View } from 'react-native'
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import BackButton from '@/components/BackButton'
import { globalStyles } from '@/styles/global'

const WSSScreen = () => {
  const navigation = useNavigation<AuthPage<'WSSScreen'>>()

  return (
    <SafeAreaView style={globalStyles.container.base}>
      <BackButton navigation={navigation} text="Water Sports Series" />
      <View style={globalStyles.container.body}>
        <Text>Welcome to the WSS page!</Text>
      </View>
    </SafeAreaView>
  )
}

export default WSSScreen
