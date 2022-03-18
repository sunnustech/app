import MapView, { Camera } from 'react-native-maps'
import { CustomMarker } from '@/components/Markers'

import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/soar-map'

const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

const Map = ({
  ref,
  getCurrentLocation,
  navigation,
  filterLocations,
}: MapProps) => {
  return (
    <MapView
      ref={ref}
      style={styles.overlap}
      provider={'google'}
      initialCamera={NUSCoordinates}
      showsUserLocation={true}
      onUserLocationChange={getCurrentLocation}
    >
      {filterLocations.map((e: any) => (
        <CustomMarker
          key={e.id}
          navigation={navigation}
          coordinate={e.coordinate}
          description={e.description}
        >
          {e.icon()}
        </CustomMarker>
      ))}
    </MapView>
  )
}

export default Map
