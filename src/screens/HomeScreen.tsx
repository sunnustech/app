import { KeyboardAvoidingView, Text, View } from 'react-native'
// import tailwind react native classes
import tw from 'twrnc'
import { Tab } from '@headlessui/react'

/* firebase */
import { signOut, Auth } from 'firebase/auth'

/* navigation */
import { DrawerPages, StackPages } from '@/lib/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import styles from '@/styles/main'
import { Button, ButtonRed } from '@/components/Buttons'
import { notificationInit } from '@/lib/notifications'

const HomeScreen = () => {
  notificationInit()
  const navigation = useNavigation<DNP<DrawerPages, 'HomeScreen'>>()
  const stack = useNavigation<NSNP<StackPages, 'Home'>>()

  const logoutHandler = (auth: Auth, stack: NSNP<StackPages, 'Home'>) => {
    signOut(auth)
      .then(() => {
        stack.replace('Login')
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
        <Button onPress={() => navigation.navigate('NotificationScreen')}>
          Notifications Screen
        </Button>
        <Button onPress={() => navigation.navigate('DatabaseScreen')}>
          Database Screen
        </Button>
        <Button onPress={() => navigation.navigate('ScanScreen')}>
          QR Code Screen
        </Button>
        <Button onPress={() => navigation.navigate('MapScreen')}>
          View your current location!
        </Button>
        <Button onPress={() => navigation.navigate('KnockoutTable')}>
          Knockout Table
        </Button>
        <Button onPress={() => navigation.navigate('ScoreboardScreen')}>
          Scoreboard
        </Button>
        <ButtonRed onPress={() => logoutHandler(auth, stack)}>Logout</ButtonRed>
      </View>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen
