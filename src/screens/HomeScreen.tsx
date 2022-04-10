import {
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableOpacity,
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
import Svgs from '@/components/svgs'

const Button = ({ onPress, children, containerStyle, textStyle }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
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

  const { userId, teamName } = useContext(UserContext)

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Svgs.Sunnus fill="#1f2937" />
      <Text>{`Welcome, ${userId}, of team ${teamName}`}</Text>
      <View style={styles.buttonContainer}>
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
        <Button
          onPress={() => navigation.navigate('GeneratorScreen')}
          textStyle={styles.WSSbuttonText}
          containerStyle={styles.WSSbutton}
        >
          Generate QR
        </Button>
        <Button
          onPress={() => navigation.navigate('DEVScreen')}
          textStyle={styles.DEVbuttonText}
          containerStyle={styles.DEVbutton}
        >
          Development
        </Button>
        <ButtonRed onPress={() => logoutHandler(auth)}>Logout</ButtonRed>
      </View>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen
