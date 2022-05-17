import { View } from 'react-native'
import colors from '@/styles/colors'
import { SunnusSvg } from '@/components/svgs'
import { globalStyles } from '@/styles/global'

const SplashScreen = () => {
  return (
    <View style={globalStyles.splash.background}>
      <View style={globalStyles.splash.logoContainer}>
        <SunnusSvg fill={colors.orange[500]} />
      </View>
    </View>
  )
}

export default SplashScreen
