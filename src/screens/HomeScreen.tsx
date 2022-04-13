import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Modal } from 'react-native-paper'

/* firebase */
import { signOut, Auth } from 'firebase/auth'

/* navigation */
import { AuthenticatedPages, AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { home as styles } from '@/styles/fresh'
import { ButtonRed } from '@/components/Buttons'
import { useState } from 'react'
import { SOARButton, TSSButton, WSSButton } from '@/components/SeriesButton'
import Header from '@/components/home/Header'

const DevButton = ({ onPress, children, containerStyle, textStyle }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.devButton, containerStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const HomeScreen = () => {
  const navigation = useNavigation<AuthPage<'HomeScreen'>>()
  const [showSettings, setShowSettings] = useState(false)

  const DeveloperModal = () => {
    function go(target: keyof AuthenticatedPages) {
      navigation.navigate(target)
      setShowSettings(false)
    }
    return (
      <Modal
        visible={showSettings}
        dismissable={true}
        onDismiss={() => setShowSettings(false)}
      >
        <View style={styles.modalContainer}>
          <DevButton
            onPress={() => go('GeneratorScreen')}
            textStyle={styles.GenerateQRbuttonText}
            containerStyle={styles.GenerateQRbutton}
          >
            Generate QR
          </DevButton>
          <DevButton
            onPress={() => go('DEVScreen')}
            textStyle={styles.DEVbuttonText}
            containerStyle={styles.DEVbutton}
          >
            Development
          </DevButton>
          <View style={{height: 24}}/>
        <ButtonRed onPress={() => logoutHandler(auth)}>Logout</ButtonRed>
        </View>
      </Modal>
    )
  }

  const logoutHandler = (auth: Auth) => {
    signOut(auth)
      .then(() => {
        console.log('successful signout') // perma
      })
      .catch((err) => console.log(err)) // perma
  }

  /*
   * note that the auth variable is populated after login
   * and you can access its data by calling a field or a method on auth.
   *
   * $ console.log(auth.currentUser) // perma
   * >>> <firebase username>
   */

  return (
    <SafeAreaView style={styles.container}>
      <Header setShowSettings={setShowSettings} />
      <View style={styles.bodyContainer}>
        <SOARButton onPress={() => navigation.navigate('SOARNavigator')}/>
        <TSSButton onPress={() => navigation.navigate('TSSNavigator')}/>
        <WSSButton onPress={() => navigation.navigate('WSSScreen')}/>
      </View>
      <DeveloperModal />
    </SafeAreaView>
  )
}

export default HomeScreen
