import { seriesButton as styles } from '@/styles/fresh'
import { TouchableOpacity, View } from 'react-native'
import { OnPress } from '@/types/index'
import colors from '@/styles/colors'
import SOAR from '@/components/svgs/SOAR'
import TSS from '@/components/svgs/TSS'
import WSS from '@/components/svgs/WSS'

const SOARButton = ({ onPress }: { onPress: OnPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.seriesButton, styles.SOARbutton]}
    >
      <View style={styles.logoContainer}>
        <SOAR fill={colors.amber[600]} />
      </View>
    </TouchableOpacity>
  )
}

const TSSButton = ({ onPress }: { onPress: OnPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.seriesButton, styles.TSSbutton]}
    >
      <View style={styles.logoContainer}>
        <TSS fill={colors.green[600]} />
      </View>
    </TouchableOpacity>
  )
}

const WSSButton = ({ onPress }: { onPress: OnPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.seriesButton, styles.WSSbutton]}
    >
      <View style={styles.logoContainer}>
        <WSS fill={colors.sky[600]} />
      </View>
    </TouchableOpacity>
  )
}

export default TouchableOpacity
export { SOARButton, TSSButton, WSSButton }
