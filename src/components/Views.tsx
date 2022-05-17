import { View } from 'react-native'
import { SafeDivProps } from '@/types/index'
import { globalStyles } from '@/styles/global'

const NoTouchDiv = ({ style, children }: SafeDivProps) => (
  <View style={style} pointerEvents="box-none">
    {children}
  </View>
)

const Overlap = ({ children, style }: SafeDivProps) => (
  <NoTouchDiv style={[globalStyles.container.overlap, style]}>
    {children}
  </NoTouchDiv>
)

export { NoTouchDiv, Overlap }
