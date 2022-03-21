import { map as styles } from '@/styles/fresh'
import { MapButtonProps } from '@/types/soar-map'
import { View } from 'react-native'

const MapButton = ({ icon, onPress, style }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name] = icon
  return (
    <View style={style}>
      <IconProvider name={name} color="black" size={24} onPress={onPress} />
    </View>
  )
}

const MapTopButton = ({ icon, onPress }: MapButtonProps) => (
  <MapButton
    style={[styles.mapSideButton, styles.mapTopButton]}
    icon={icon}
    onPress={onPress}
  />
)

const MapBottomButton = ({ icon, onPress }: MapButtonProps) => (
  <MapButton
    style={[styles.mapSideButton, styles.mapBottomButton]}
    icon={icon}
    onPress={onPress}
  />
)

const MapNavigationButton = ({ icon, onPress }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name] = icon
  return (
    <View style={styles.mapNavigationButton}>
      <IconProvider name={name} color="white" size={32} onPress={onPress} />
    </View>
  )
}

export { MapNavigationButton, MapTopButton, MapBottomButton }
export default MapButton
