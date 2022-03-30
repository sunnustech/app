import MapView, { Camera, PROVIDER_GOOGLE } from 'react-native-maps'
import { CustomMarker } from '@/components/Markers'

import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/soar-map'
import { Text } from 'react-native'

const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

const Map = ({
  getCurrentLocation,
  navigation,
  displayLocations,
}: MapProps) => {
  return (
    <MapView
      style={styles.overlap}
      provider={PROVIDER_GOOGLE}
      initialCamera={NUSCoordinates}
      showsUserLocation={true}
      onUserLocationChange={getCurrentLocation}
    >
      {displayLocations.map((e: any, i: number) => (
        <CustomMarker key={i} navigation={navigation} coordinate={e.coordinate}>
          <Text>{`${e.type}: ${e.title}`}</Text>
        </CustomMarker>
      ))}
    </MapView>
  )
}

export default Map
