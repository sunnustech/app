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
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { home as styles } from '@/styles/fresh'
import { ButtonRed } from '@/components/Buttons'
import SunnusLogo from '../../assets/sunnus-anniversary.png'
import { UserContext } from '@/contexts/UserContext'
import { useContext } from 'react'

const Button = ({ onPress, children, containerStyle, textStyle }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const HomeScreen = () => {
  const navigation = useNavigation<DNP<DrawerPages, 'HomeScreen'>>()

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

  const { userId, teamName, schedule, teamData } = useContext(UserContext)

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={SunnusLogo} style={styles.image} />
      <Text>{`Welcome, ${userId}, of team ${teamName}`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('SOAR')}
          textStyle={styles.SOARbuttonText}
          containerStyle={styles.SOARbutton}
        >
          SOAR
        </Button>
        <Button
          onPress={() => navigation.navigate('TSS')}
          textStyle={styles.TSSbuttonText}
          containerStyle={styles.TSSbutton}
        >
          TSS
        </Button>
        <Button
          onPress={() => navigation.navigate('WSS')}
          textStyle={styles.WSSbuttonText}
          containerStyle={styles.WSSbutton}
        >
          WSS
        </Button>
        <Button
          onPress={() => navigation.navigate('DEV')}
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
