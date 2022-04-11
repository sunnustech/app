import { View } from 'react-native'
import { knockout as styles } from '@/styles/fresh'

const Circle = ({ isActive }: { isActive: boolean }) => {
  return <View style={isActive ? styles.activePage : styles.inactivePage} />
}

const PageIndicator = ({
  total,
  current,
}: {
  total: number
  current: number
}) => {

  const Circles = []

  for (var i = 0; i < total; i++) {
    Circles.push(<Circle key={i} isActive={i === current} />)
  }

  return (
    <>
      <View style={styles.pageIndicatorContainer}>
        {Circles}
      </View>
    </>
  )
}

export default PageIndicator
