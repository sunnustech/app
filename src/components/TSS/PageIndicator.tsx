import { StyleProp, View, ViewStyle } from 'react-native'
import { knockout as styles } from '@/styles/fresh'
import { PageStatus } from '@/types/TSS'

const Circle = ({
  baseStyle,
  isActive,
}: {
  isActive: boolean
  baseStyle: StyleProp<ViewStyle>
}) => {
  const style = isActive ? [baseStyle, styles.activePage] : [baseStyle]
  return <View style={style} />
}

const PageIndicator = ({
  statuses,
  total,
  current,
}: {
  statuses: PageStatus[]
  total: number
  current: number
}) => {
  const Circles = []

  const styleMap: Record<PageStatus, StyleProp<ViewStyle>> = {
    'no-one': styles.noOnePage,
    'one-in': styles.oneInPage,
    'both-in': styles.bothInPage,
    'in-progress': styles.inProgressPage,
    completed: styles.completedPage,
  }

  for (var i = 0; i < total; i++) {
    Circles.push(
      <Circle
        key={i}
        isActive={i === current}
        baseStyle={[styles.basePage, styleMap[statuses[i]]]}
      />
    )
  }

  return (
    <>
      <View style={styles.pageIndicatorContainer}>{Circles}</View>
    </>
  )
}

export default PageIndicator
