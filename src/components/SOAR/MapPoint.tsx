import { Marker, Callout } from 'react-native-maps'
import { View } from 'react-native'
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons'
import Popup from './Popup'
import Gem from './Gem'
import { map as styles } from '@/styles/fresh'
import {
  MapPointIconProps,
  MapPointPopupProps,
  MapPointProps,
} from '@/types/SOAR'

const MapPoint = ({
  navigation,
  coordinate,
  navTarget,
  content,
  pointType,
  status,
  children,
}: MapPointProps) => {
  return (
    <Marker coordinate={coordinate} opacity={status === '' ? 0 : 1}>
      <HandleIcon children={children} pointType={pointType} status={status} />
      <HandlePopup
        navigation={navigation}
        status={status}
        navTarget={navTarget}
        content={content}
      />
    </Marker>
  )
}

const HandlePopup = ({
  navigation,
  navTarget,
  content,
  status,
}: MapPointPopupProps) => {
  if (status === 'next') {
    return (
      <Callout
        style={styles.callout}
        onPress={() => navigation.navigate(navTarget)}
      >
        <Popup content={content} />
      </Callout>
    )
  }
  return null
}

const HandleIcon = ({ pointType, status }: MapPointIconProps) => {
  if (pointType === 'game') {
    if (status === 'done') {
      return <MCI name="marker-check" color="#10b981" size={24} />
    }
    if (status === 'next') {
      return (
        <View style={styles.GemContainer}>
          <Gem />
        </View>
      )
    }
    if (status === '') {
      return <MCI name="marker-check" color="#ff0000" size={1} />
    }
  }
  if (pointType === 'water') {
    return <MCI name="cup-water" color="#60A5FA" size={24} />
  }
  return null
}

export default MapPoint
