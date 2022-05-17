import { Marker, Callout, LatLng } from 'react-native-maps'
import { View } from 'react-native'
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons'
import Popup from './Popup'
import { GemSvg } from '@/components/svgs'
import { map as styles } from '@/styles/fresh'
import colors from '@/styles/colors'
import { Location } from '@/classes/location'

const MapPoint = (props: { location: Location }) => {
  const location = props.location
  const coordinate: LatLng = {
    latitude: location.latitude,
    longitude: location.longitude,
  }
  return (
    <Marker
      coordinate={coordinate}
      opacity={location.status === 'hidden' ? 0 : 1}
    >
      <Icon location={location}/>
      <HandlePopup location={location} />
    </Marker>
  )
}

const HandlePopup = (props: { location: Location }) => {
  const location = props.location
  if (location.status === 'next') {
    return (
      <Callout
        style={styles.callout}
        onPress={() => console.log('pressed callout')}
      >
        <Popup content={location.details} />
      </Callout>
    )
  }
  return null
}

const Icon = (props: { location: Location }) => {
  const { type, status } = props.location
  if (type === 'game') {
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
  if (type === 'water') {
    return <MCI name="cup-water" color={colors.blue[400]} size={24} />
  }
  return null
}

export default MapPoint
