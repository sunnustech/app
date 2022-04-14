import { Text, View } from 'react-native'
import colors from '@/styles/colors'

/* sunnus components */
import { SunnusSvg } from '@/components/svgs'
import { splash as styles } from '@/styles/fresh'

const SplashScreen = () => {
  return (
    <View style={styles.background}>
        <View style={styles.logoContainer}>
          <SunnusSvg fill={colors.gray[100]} />
        </View>
    </View>
  )
}

export default SplashScreen
