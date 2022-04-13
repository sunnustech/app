import { View, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/Sunnus'
import { Overlap } from '@/components/Views'
import { home as styles } from '@/styles/fresh'

const Circle = () => {
  return <View style={styles.circle} />
}

const HiddenCircle = () => {
  return <View style={[styles.circle, styles.transparent]} />
}

const Heart = ({ alert }: { alert: boolean }) => {
  return (
    <TouchableOpacity style={styles.headerButton}>
      {alert ? <HiddenCircle /> : null}
      <MCI name={'heart-outline'} size={24} color={colors.homeFg} />
      {alert ? <Circle /> : null}
    </TouchableOpacity>
  )
}

const Header = () => {
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
          <Heart alert={true} />
        </View>
      </Overlap>
    </View>
  )
}

export default Header
