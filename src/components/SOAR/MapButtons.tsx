import { map as styles } from '@/styles/fresh'
import { MapButtonProps } from '@/types/soar-map'
import { TouchableOpacity, View } from 'react-native'
import {
  MaterialCommunityIcons as MCI,
  MaterialIcons as MI,
  Fontisto as FO,
} from '@expo/vector-icons'

const MapButton = ({ icon, onPress, style }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name, color] = icon
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <IconProvider name={name} color={color ? color : '#323232'} size={24} />
    </TouchableOpacity>
  )
}

const MapAdminToggle = ({ onPress, activated }: any) => {
  const icon = [MCI, 'cup-water', activated ? 'white' : 'black']
  return <MapTopButton icon={icon} onPress={onPress} activated={activated} />
}

const MapSOSButton = ({ onPress }: any) => {
  const icon = [FO, 'asterisk', '#ef4444']
  return <MapBottomButton icon={icon} onPress={onPress} />
}

const MapCurretLocationButton = ({ onPress }: any) => {
  const icon = [MI, 'near-me', 'white']
  return (
    <MapBottomButton
      icon={icon}
      onPress={onPress}
      style={[styles.mapCurrentLocationButton]}
    />
  )
}

const MapTopButton = ({ icon, onPress, activated = false }: MapButtonProps) => {
  const style = activated
    ? [styles.mapSideButton, styles.mapTopButton, styles.mapActivatedButton]
    : [styles.mapSideButton, styles.mapTopButton]
  return <MapButton style={style} icon={icon} onPress={onPress} />
}

const MapBottomButton = ({ icon, onPress, style = [] }: MapButtonProps) => (
  <MapButton
    style={[styles.mapSideButton, styles.mapBottomButton, ...style]}
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

export {
  MapNavigationButton,
  MapTopButton,
  MapBottomButton,
  MapAdminToggle,
  MapSOSButton,
  MapCurretLocationButton,
}
export default MapButton
