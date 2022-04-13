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
import colors from '@/styles/colors'
import { Ionicons } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/TransformSunnus'
import { Overlap } from '../components/Views'
import { useState } from 'react'

const SeriesButton = ({ onPress, children, containerStyle, textStyle }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.seriesButton, containerStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

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
  const [showDevModal, setShowDevModal] = useState(false)

  const DeveloperModal = () => {
    function go(target: keyof AuthenticatedPages) {
      navigation.navigate(target)
      setShowDevModal(false)
    }
    return (
      <Modal
        visible={showDevModal}
        dismissable={true}
        onDismiss={() => setShowDevModal(false)}
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

  const Header = () => {
    return (
      <View style={styles.headingContainer}>
        <Overlap>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Sunnus fill={colors.gray[800]} />
            </View>
          </View>
        </Overlap>
        <Overlap>
          <View style={styles.iconsContainer}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="heart-outline" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowDevModal(true)}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Overlap>
      </View>
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
      <Header />
      <View style={styles.bodyContainer}>
        <SeriesButton
          onPress={() => navigation.navigate('SOARNavigator')}
          textStyle={styles.SOARbuttonText}
          containerStyle={styles.SOARbutton}
        >
          SOAR
        </SeriesButton>
        <SeriesButton
          onPress={() => navigation.navigate('TSSNavigator')}
          textStyle={styles.TSSbuttonText}
          containerStyle={styles.TSSbutton}
        >
          TSS
        </SeriesButton>
        <SeriesButton
          onPress={() => navigation.navigate('WSSScreen')}
          textStyle={styles.WSSbuttonText}
          containerStyle={styles.WSSbutton}
        >
          WSS
        </SeriesButton>
      </View>
      <DeveloperModal />
    </SafeAreaView>
  )
}

export default HomeScreen
