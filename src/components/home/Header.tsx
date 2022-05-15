import { View, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { AntDesign } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/Sunnus'
import { Overlap } from '@/components/Views'
import { AuthPageNavigator } from '@/types/navigation'
import { OnPress } from '@/types/index'
import { globalStyles } from '../../styles/global'

const Circle = () => {
  return <View style={globalStyles.shapes.circle} />
}

const HiddenCircle = () => {
  return (
    <View
      style={[globalStyles.shapes.circle, globalStyles.utils.transparent]}
    />
  )
}

const Heart = ({ alert, onPress }: { alert: boolean; onPress: OnPress }) => {
  return (
    <TouchableOpacity
      style={globalStyles.button.outline.base}
      onPress={onPress}
    >
      {alert ? <HiddenCircle /> : null}
      <AntDesign name={'hearto'} size={20} color={colors.homeFg} />
      {alert ? <Circle /> : null}
    </TouchableOpacity>
  )
}

const Header = ({ navigation }: { navigation: AuthPageNavigator }) => {
  return (
    <View style={globalStyles.container.header}>
      <Overlap>
        <View style={globalStyles.container.headerLogo}>
          <Sunnus fill={colors.homeFg} />
        </View>
      </Overlap>
      <Overlap>
        <View style={globalStyles.container.headerIcons}>
          <View style={{ flex: 1 }} />
          <Heart
            alert={true}
            onPress={() => navigation.navigate('NotificationScreen')}
          />
        </View>
      </Overlap>
    </View>
  )
}

export default Header
