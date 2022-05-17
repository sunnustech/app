import { Text } from 'react-native'
import { CalloutSubview } from 'react-native-maps'
import { Location } from '@/classes/location'
import { globalStyles } from '@/styles/global'

const Popup = (props: {location: Location}) => {
  const {details, gameTitle} = props.location
  return (
    <CalloutSubview style={globalStyles.container.mapCallout}>
      <Text style={globalStyles.text.calloutTitle}>{gameTitle}</Text>
      <Text>{details}</Text>
    </CalloutSubview>
  )
}

export default Popup
