import { Marker, Callout, LatLng } from 'react-native-maps'
import { View } from 'react-native'
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons'
import Popup from './Popup'
import { Gem } from '@/components/svgs'
import colors from '@/styles/colors'
import { Location } from '@/classes/location'

const MapPoint = (props: { location: Location }) => {
  const location = props.location
  const coordinate: LatLng = {
    latitude: location.latitude,
    longitude: location.longitude,
  }
  return (
    <Marker coordinate={coordinate} opacity={1}>
      <Icon location={location} />
      <HandlePopup location={location} />
    </Marker>
  )
}

const HandlePopup = (props: { location: Location }) => {
  const location = props.location
  if (location.status === 'next') {
    return (
      <Callout tooltip>
        <Popup location={location} />
      </Callout>
    )
  }
  return null
}

const Icon = (props: { location: Location }) => {
  const { type, status } = props.location
  // hide hidden stations
  if (status === 'hidden') {
    // null will show default markers
    return <View />
  }
  // show water points
  if (type === 'water') {
    return <MCI name="cup-water" color={colors.blue[400]} size={24} />
  }
  // don't handle anything other than game stations past this point
  if (type !== 'game') {
    return <View />
  }
  if (status === 'done') {
    return <MCI name="marker-check" color={colors.emerald[500]} size={24} />
  }
  if (status === 'next') {
    return <Gem size={22} />
  }
  return null
}

export default MapPoint
