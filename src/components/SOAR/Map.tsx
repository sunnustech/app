import MapView, { Camera, PROVIDER_GOOGLE } from 'react-native-maps'
import MapPoint from '@/components/SOAR/MapPoint'

import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/soar-map'
import { Text } from 'react-native'
import { customMapStyle } from './MapStyle'
import { NUSCoordinates } from '@/data/constants'

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
      {displayLocations.map((e: any, i: number) => (
        <MapPoint
          key={i}
          navigation={navigation}
          coordinate={e.coordinate}
          pointType={e.type}
          content={e.content}
        >
          <Text>{`${e.type}: ${e.title}`}</Text>
        </MapPoint>
      ))}
    </MapView>
  )
}

export default Map
