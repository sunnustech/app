import { View, SafeAreaView, StatusBar, Platform } from 'react-native'

/* firebase */
import { signOut, Auth } from 'firebase/auth'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { globalStyles } from '@/styles/global'
import { useState } from 'react'
import { SOARButton, TSSButton, WSSButton } from '@/components/SeriesButton'
import Header from '@/components/home/Header'
import Settings from '@/components/home/Settings'
import Footer from '@/components/home/Footer'

const HomeScreen = () => {
  const navigation = useNavigation<AuthPage<'HomeScreen'>>()
  const showSettingsState = useState(false)
  const setShowSettings = showSettingsState[1]

  const logoutHandler = (auth: Auth) => {
    signOut(auth)
      .then(() => {
        console.debug('successful signout') // perma
      })
      .catch((err) => console.debug(err)) // perma
  }

  /*
   * note that the auth variable is populated after login
   * and you can access its data by calling a field or a method on auth.
   *
   * $ console.debug(auth.currentUser) // perma
   * >>> <firebase username>
   */

  return (
    <SafeAreaView style={globalStyles.container.base}>
      <Header navigation={navigation} />
      <View style={globalStyles.container.body}>
        <View style={globalStyles.container.padded}>
          <SOARButton onPress={() => navigation.navigate('SOARNavigator')} />
          <TSSButton onPress={() => navigation.navigate('TSSNavigator')} />
          <WSSButton onPress={() => navigation.navigate('WSSScreen')} />
        </View>
      </View>
      <Settings
        showSettingsState={showSettingsState}
        navigation={navigation}
        logoutHandler={logoutHandler}
      />
      <Footer setShowSettings={setShowSettings} />
    </SafeAreaView>
  )
}

export default HomeScreen
