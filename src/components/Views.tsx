import { View } from 'react-native'
import { map as styles } from '@/styles/fresh'
import { SafeDivProps } from '@/types/soar-map'

const NoTouchDiv = ({ style, children }: SafeDivProps) => (
  <View style={style} pointerEvents="box-none">
    {children}
  </View>
)

const Overlap = ({ children, style }: SafeDivProps) => (
  <NoTouchDiv style={[styles.overlap, style]}>{children}</NoTouchDiv>
)

export { NoTouchDiv, Overlap }
