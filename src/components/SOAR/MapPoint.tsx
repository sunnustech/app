import { Marker, Callout } from 'react-native-maps'
import { View } from 'react-native'
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons'
import Popup from './Popup'
import { GemSvg } from '@/components/svgs'
import { map as styles } from '@/styles/fresh'
import {
  MapPointIconProps,
  MapPointPopupProps,
  MapPointProps,
} from '@/types/SOAR'
import colors from '@/styles/colors'

const MapPoint = ({
  navigation,
  coordinate,
  navTarget,
  content,
  pointType,
  status,
}: MapPointProps) => {
  return (
    <Marker coordinate={coordinate} opacity={status === '' ? 0 : 1}>
      <HandleIcon pointType={pointType} status={status} />
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
      return <MCI name="marker-check" color={colors.emerald[500]} size={24} />
    }
    if (status === 'next') {
      return (
        <View style={styles.GemContainer}>
          <GemSvg />
        </View>
      )
    }
    if (status === '') {
      return <MCI name="marker-check" color={colors.red[500]} size={1} />
    }
  }
  if (pointType === 'water') {
    return <MCI name="cup-water" color={colors.blue[400]} size={24} />
  }
  return null
}

export default MapPoint
