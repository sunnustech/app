import { seriesButton as styles } from '@/styles/fresh'
import { TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import { OnPress } from '@/types/index'
import colors from '@/styles/colors'
import SOAR from '@/components/svgs/SOAR'
import TSS from '@/components/svgs/TSS'
import WSS from '@/components/svgs/WSS'
import { Color } from '@/types/colors'

type SeriesProps = {
  onPress: OnPress
  color: Color
}

type SvgProps = (props: { fill: string }) => Element

const SeriesButton = (
  props: ViewProps & { color: Color; onPress: OnPress; Svg: SvgProps }
) => {
  // <View style={styles.logoContainer} children={props.children} />
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.seriesButton, props.style]}
    >
      <View style={styles.logoContainer} children="12">
        <props.Svg fill={colors[props.color][600]} />
      </View>
    </TouchableOpacity>
  )
}

// const SOARButton = (props: SeriesProps) => {
//   return (
//     <SeriesButton onPress={props.onPress} style={styles.SOARbutton}>
//       <SOAR fill={colors[props.color][600]} />
//     </SeriesButton>
//   )
// }
//
// const TSSButton = (props: SeriesProps) => {
//   return (
//     <SeriesButton onPress={props.onPress} style={styles.TSSbutton}>
//       <TSS fill={colors[props.color][600]} />
//     </SeriesButton>
//   )
// }
//
// const WSSButton = (props: SeriesProps) => {
//   return (
//     <SeriesButton onPress={props.onPress} style={styles.WSSbutton}>
//       <WSS fill={colors[props.color][600]} />
//     </SeriesButton>
//   )
// }

export default SeriesButton
