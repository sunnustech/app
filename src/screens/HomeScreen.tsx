import { KeyboardAvoidingView, Text, View } from 'react-native'
// import tailwind react native classes
import tw from 'twrnc'
import { Tab } from '@headlessui/react'

/* firebase */
import { signOut, Auth } from 'firebase/auth'

/* navigation */
import { RootStackParamList } from '@/sunnus/App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import styles from '@/styles/main'
import { Button, ButtonRed } from '@/components/Buttons'
import { notificationInit } from '@/lib/notifications'

const HomeScreen = () => {
  notificationInit()
  type NavType = NSNP<RootStackParamList, 'Home'>
  const navigation = useNavigation<NavType>()

  const logoutHandler = (auth: Auth, navigation: NavType) => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
        console.log('successful signout')
      })
      .catch((err) => console.log(err))
  }

  // example usage of tailwind react native class (3 lines below)
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={tw`bg-blue-100`}>
        You are logged in as{' '}
        {auth.currentUser ? auth.currentUser.email : 'ERROR'}!
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.push('Notifications')}>
          Notifications Screen
        </Button>
        <Button onPress={() => navigation.push('Database')}>
          Database Screen
        </Button>
        <Button onPress={() => navigation.push('Scanner')}>
          QR Code Screen
        </Button>
        <Button onPress={() => navigation.push('Map')}>
          View your current location!
        </Button>
        <Button onPress={() => navigation.push('KnockoutTable')}>
          Knockout Table
        </Button>
        <Button onPress={() => navigation.push('Scoreboard')}>
          Scoreboard
        </Button>
        <ButtonRed onPress={() => logoutHandler(auth, navigation)}>
          Logout
        </ButtonRed>
      </View>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen
