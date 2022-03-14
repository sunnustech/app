import { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import SunnusLogo from '../../assets/sunnus-anniversary.png'

/* firebase */
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'

/* navigation */
import { StackPages } from '@/lib/navigation'
import { useNavigation } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp as NSNP,
} from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { login as styles } from '@/styles/fresh'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

/* screens */
import LoginScreen from '@/screens/LoginScreen'
import HomeScreen from '@/screens/HomeScreen'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Home = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        gestureEnabled: false,
      }}
    />
  </Drawer.Navigator>
)

const AuthNavigation = () => {
  const [user, setUser] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true)
      } else {
        setUser(false)
      }
    })
  }, [])
  console.log('auth nav', auth.currentUser)

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  )
}

export default AuthNavigation
