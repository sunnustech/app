import TSSScreen from '@/screens/TSS'
import TSSKnockoutTable from '@/screens/TSS/KnockoutTable'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const TSSTabs = createBottomTabNavigator()

const TSSNavigator = () => (
  <TSSTabs.Navigator>
    <TSSTabs.Screen name="TSSScreen" component={TSSScreen} />
    <TSSTabs.Screen name="KnockoutTable" component={TSSKnockoutTable} />
  </TSSTabs.Navigator>
)

export default TSSNavigator
