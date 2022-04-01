import MapView, { Camera, Circle, PROVIDER_GOOGLE } from 'react-native-maps'
import MapPoint from '@/components/SOAR/MapPoint'
import { Fragment } from 'react'

import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/soar-map'
import { Text } from 'react-native'
import { customMapStyle } from './MapStyle'
import { NUSCoordinates } from '@/data/constants'

const Map = ({ navigation, displayLocations, mapRef }: MapProps) => {
  const gameLocations = displayLocations.filter((e: any) => e.type === 'game')
  const nonGameLocations = displayLocations.filter(
    (e: any) => e.type !== 'game'
  )

  const GameLocations = () => {
    return (
      <>
        {gameLocations.map((e: any, i: number) => (
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
        {/* uncomment to add circle, but imo it looks p ugly */}
        {/* {gameLocations.map((e: any, i: number) => ( */}
        {/*   <Circle */}
        {/*     key={i} */}
        {/*     strokeWidth={3} */}
        {/*     strokeColor="#fca5a5" */}
        {/*     fillColor="rgba(254, 202, 202, 0.4)" */}
        {/*     radius={56} */}
        {/*     center={e.coordinate} */}
        {/*   > */}
        {/*     <Text>{`${e.type}: ${e.title}`}</Text> */}
        {/*   </Circle> */}
        {/* ))} */}
      </>
    )
  }

  const NonGameLocations = () => {
    return (
      <>
        {nonGameLocations.map((e: any, i: number) => (
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
      </>
    )
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.overlap}
      provider={PROVIDER_GOOGLE}
      initialCamera={NUSCoordinates}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
    >
      <GameLocations />
      <NonGameLocations />
    </MapView>
  )
}

export default Map
