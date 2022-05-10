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
  coordinate,
  content,
  pointType,
  status,
}: MapPointProps) => {
  return (
    <Marker coordinate={coordinate} opacity={status === 'hidden' ? 0 : 1}>
      <Icon pointType={pointType} status={status} />
      <HandlePopup
        status={status}
        content={content}
      />
    </Marker>
  )
}

const HandlePopup = ({
  content,
  status,
}: MapPointPopupProps) => {
  if (status === 'next') {
    return (
      <Callout
        style={styles.callout}
        onPress={() => console.log('pressed callout')}
      >
        <Popup content={content} />
      </Callout>
    )
  }
  return null
}

const Icon = ({ pointType, status }: MapPointIconProps) => {
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
    if (status === 'hidden') {
      return <MCI name="marker-check" color={colors.red[500]} size={1} />
    }
  }
  if (pointType === 'water') {
    return <MCI name="cup-water" color={colors.blue[400]} size={24} />
  }
  return null
}

export default MapPoint
