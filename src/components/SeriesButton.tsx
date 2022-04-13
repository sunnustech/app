import { seriesButton as styles } from '@/styles/fresh'
import { TouchableOpacity, Text } from 'react-native'
import { OnPress } from '@/types/index'
import colors from '@/styles/colors'
import SOAR from './svgs/SOAR'
import TSS from './svgs/TSS'
import WSS from './svgs/WSS'

const SeriesButton = ({
  onPress,
  children,
  containerStyle,
  textStyle,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.seriesButton, containerStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const SOARButton = ({ onPress }: { onPress: OnPress }) => {
  return (
    <SeriesButton
      onPress={onPress}
      textStyle={styles.SOARbuttonText}
      containerStyle={styles.SOARbutton}
    >
      SOAR
    </SeriesButton>
  )
}

const TSSButton = ({ onPress }: { onPress: OnPress }) => {
  return (
    <SeriesButton
      onPress={onPress}
      textStyle={styles.TSSbuttonText}
      containerStyle={styles.TSSbutton}
    >
      TSS
    </SeriesButton>
  )
}

const WSSButton = ({ onPress }: { onPress: OnPress }) => {
  return (
    <SeriesButton
      onPress={onPress}
      textStyle={styles.WSSbuttonText}
      containerStyle={styles.WSSbutton}
    >
      <WSS fill={colors.gray[800]} />
    </SeriesButton>
  )
}

export default SeriesButton
export { SOARButton, TSSButton, WSSButton }
