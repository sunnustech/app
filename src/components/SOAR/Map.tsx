import MapView, { Camera, PROVIDER_GOOGLE } from 'react-native-maps'
import MapPoint from '@/components/SOAR/MapPoint'

import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/soar-map'
import { Text } from 'react-native'
import { customMapStyle } from './MapStyle'

const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

const Map = ({ navigation, displayLocations, mapRef }: MapProps) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.overlap}
      provider={PROVIDER_GOOGLE}
      initialCamera={NUSCoordinates}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
    >
      {displayLocations.map((e: any, i: number) => {
        return (
          <MapPoint
            key={i}
            navigation={navigation}
            coordinate={e.coordinate}
            pointType={e.type}
            content={e.content}
          >
            <Text>{`${e.type}: ${e.title}`}</Text>
          </MapPoint>
        )
      })}
    </MapView>
  )
}

export default Map
