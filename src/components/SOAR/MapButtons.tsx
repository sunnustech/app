import { map as styles } from '@/styles/fresh'
import { MapButtonProps } from '@/types/SOAR'
import { Text, TouchableOpacity } from 'react-native'
import {
  MaterialCommunityIcons as MCI,
  MaterialIcons as MI,
  Fontisto as FO,
} from '@expo/vector-icons'
import colors from '@/styles/colors'

const MapButton = ({ icon, onPress, style }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name, color] = icon
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <IconProvider
        name={name}
        color={color ? color : colors.gray[700]}
        size={24}
      />
    </TouchableOpacity>
  )
}

const MapAdminToggle = ({ onPress, activated }: any) => {
  const icon = [MCI, 'cup-water', activated ? 'white' : 'black']
  return <MapTopButton icon={icon} onPress={onPress} activated={activated} />
}

const MapSOSButton = ({ onPress }: any) => {
  const icon = [FO, 'asterisk', colors.red[500]]
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

const MapGoToSchoolButton = ({ onPress }: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.mapSideButton,
        styles.mapBottomButton,
        styles.mapCurrentLocationButton,
      ]}
      onPress={onPress}
    >
      <Text style={{ fontWeight: '800', color: 'white', textAlign: 'center' }}>
        NUS
      </Text>
    </TouchableOpacity>
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

const MapNavigationButtonDark = ({ icon, onPress }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name] = icon
  return (
    <TouchableOpacity style={styles.mapNavigationButton} onPress={onPress}>
      <IconProvider name={name} color="white" size={32} />
    </TouchableOpacity>
  )
}

const MapNavigationButton = ({ icon, onPress }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name] = icon
  return (
    <TouchableOpacity style={[styles.mapSideButton, styles.mapNavigationButton]} onPress={onPress}>
      <IconProvider name={name} color={colors.gray[700]} size={32} />
    </TouchableOpacity>
  )
}

export {
  MapNavigationButton,
  MapTopButton,
  MapBottomButton,
  MapAdminToggle,
  MapSOSButton,
  MapCurretLocationButton,
  MapGoToSchoolButton,
  MapNavigationButtonDark
}
export default MapButton
