import { createStackNavigator } from '@react-navigation/stack'
import { SOARPages } from '@/types/navigation'
import { SOARScreen, QRScreen } from '@/screens/index'

const SOARStack = createStackNavigator<SOARPages>()

const SOARNavigator = () => {

  return (
    <SOARStack.Navigator
      initialRouteName="SOARScreen"
      screenOptions={{ headerShown: false }}
    >
      <SOARStack.Screen
        name="SOARScreen"
        component={SOARScreen}
        options={{ animationEnabled: false }}
      />
      <SOARStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ animationEnabled: false }}
      />
    </SOARStack.Navigator>
  )
}

export default SOARNavigator
