import { View, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { AntDesign } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/Sunnus'
import { Overlap } from '@/components/Views'
import { home as styles } from '@/styles/fresh'

const Heart = ({ alert }: { alert: boolean }) => {
  return (
    <TouchableOpacity style={styles.headerButton}>
      <AntDesign name="hearto" size={20} color={colors.homeFg} />
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
          <Heart alert={false} />
        </View>
      </Overlap>
    </View>
  )
}

export default Header
