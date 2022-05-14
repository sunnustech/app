import { View, TouchableOpacity, Text } from 'react-native'
import colors from '@/styles/colors'
import { AntDesign } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/Sunnus'
import { Overlap } from '@/components/Views'
import { home as styles } from '@/styles/fresh'
import { AuthPageNavigator } from '@/types/navigation'
import { OnPress } from '@/types/index'

const Circle = () => {
  return <View style={styles.circle} />
}

const HiddenCircle = () => {
  return <View style={[styles.circle, styles.transparent]} />
}

const Heart = ({ alert, onPress }: { alert: boolean; onPress: OnPress }) => {
  return (
    <TouchableOpacity style={styles.headerButton} onPress={onPress}>
      {alert ? <HiddenCircle /> : null}
      <AntDesign name={'hearto'} size={20} color={colors.homeFg} />
      {alert ? <Circle /> : null}
    </TouchableOpacity>
  )
}

const Header = ({ navigation }: { navigation: AuthPageNavigator }) => {
  return (
    <View style={styles.headerContainer}>
      <Overlap>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Sunnus fill={colors.homeFg} />
          </View>
        </View>
      </Overlap>
      <Overlap>
        <View style={styles.iconsContainer}>
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
