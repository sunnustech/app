import {
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'

/* firebase */
import { signOut, Auth } from 'firebase/auth'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { home as styles } from '@/styles/fresh'
import { ButtonRed } from '@/components/Buttons'
import { UserContext } from '@/contexts/UserContext'
import { useContext } from 'react'
import { SunnusSvg } from '@/components/svgs'
import colors from '@/styles/colors'
import { Ionicons } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/TransformSunnus'

const Button = ({ onPress, children, containerStyle, textStyle }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
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

const Header = () => {
  return (
    <View style={styles.headingContainer}>
      <View style={styles.headingSides} />
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Sunnus fill={colors.gray[800]} />
        </View>
      </View>
      <View style={styles.headingSides}>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const HomeScreen = () => {
  const navigation = useNavigation<AuthPage<'HomeScreen'>>()

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
    <SafeAreaView style={styles.container} behavior="padding">
      <Header />
      <View style={styles.bodyContainer}>
        <Button
          onPress={() => navigation.navigate('SOARNavigator')}
          textStyle={styles.SOARbuttonText}
          containerStyle={styles.SOARbutton}
        >
          SOAR
        </Button>
        <Button
          onPress={() => navigation.navigate('TSSNavigator')}
          textStyle={styles.TSSbuttonText}
          containerStyle={styles.TSSbutton}
        >
          TSS
        </Button>
        <Button
          onPress={() => navigation.navigate('WSSScreen')}
          textStyle={styles.WSSbuttonText}
          containerStyle={styles.WSSbutton}
        >
          WSS
        </Button>
        <DevButton
          onPress={() => navigation.navigate('GeneratorScreen')}
          textStyle={styles.GenerateQRbuttonText}
          containerStyle={styles.GenerateQRbutton}
        >
          Generate QR
        </DevButton>
        <DevButton
          onPress={() => navigation.navigate('DEVScreen')}
          textStyle={styles.DEVbuttonText}
          containerStyle={styles.DEVbutton}
        >
          Development
        </DevButton>
        <ButtonRed onPress={() => logoutHandler(auth)}>Logout</ButtonRed>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
