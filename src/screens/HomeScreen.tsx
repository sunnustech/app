import { View, SafeAreaView } from 'react-native'

/* firebase */
import { signOut, Auth } from 'firebase/auth'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { globalStyles } from '@/styles/global'
import { useState } from 'react'
import Header from '@/components/home/Header'
import Settings from '@/components/home/Settings'
import Footer from '@/components/home/Footer'
import { Series } from '@/components/Buttons'

import SOAR from '@/components/svgs/SOAR'
import TSS from '@/components/svgs/TSS'
// retired series
import WSS from '@/components/svgs/WSS'

const HomeScreen = () => {
  const navigation = useNavigation<AuthPage<'HomeScreen'>>()
  const showSettingsState = useState(false)
  const setShowSettings = showSettingsState[1]

  /**
   * Handles user logout
   *
   * @param {Auth} auth authentication object verified with firebase
   */
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
          <Series
            color="amber"
            svg={SOAR}
            onPress={() => navigation.navigate('SOARNavigator')}
          />
          <Series
            color="green"
            svg={TSS}
            onPress={() => navigation.navigate('TSSNavigator')}
          />
          {/* A retired series
          <Series
            color="sky"
            svg={WSS}
            onPress={() => navigation.navigate('WSSScreen')}
          /> 
          */}
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
