import { map as styles } from '@/styles/fresh'
import { MapButtonProps } from '@/types/soar-map'
import { View } from 'react-native'

const MapButton = ({ icon, onPress }: MapButtonProps) => {
  // icon: provider + name
  const [IconProvider, name] = icon
  return (
    <View style={styles.mapSideButton}>
      <IconProvider name={name} color="black" size={24} onPress={onPress} />
    </View>
  )
}

export default MapButton
