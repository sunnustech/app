import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapPoint from '@/components/SOAR/MapPoint'

import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/SOAR'
import { customMapStyle } from './MapStyle'
import { NUSCoordinates } from '@/data/constants'
import { SOARContext } from '@/contexts/SOARContext'
import { useContext } from 'react'
import { log } from '@/utils/cli'

const Map = ({ mapRef }: MapProps) => {
  const { teamState, gameStations } = useContext(SOARContext)

  const team = teamState[0]

  gameStations.update(team)

  log.yellow('displayLocations', gameStations)

  // const gameLocations = displayLocations.filter(
  //   (stn) => stn.stationType === 'game'
  // )
  // const nonGameLocations = displayLocations.filter(
  //   (e: any) => e.stationType !== 'game'
  // )
  //
  // const GameLocations = () => {
  //   return team._started ? (
  //     <>
  //       {gameLocations.map((e: any, i: number) => (
  //         <MapPoint
  //           key={i}
  //           coordinate={e.coordinate}
  //           pointType={e.stationType}
  //           content={e.content}
  //           status={e.status}
  //         />
  //       ))}
  //     </>
  //   ) : null
  // }
  //
  // const NonGameLocations = () => {
  //   return (
  //     <>
  //       {nonGameLocations.map((e: any, i: number) => (
  //         <MapPoint
  //           key={i}
  //           coordinate={e.coordinate}
  //           pointType={e.stationType}
  //           status={e.status}
  //           content={e.content}
  //         />
  //       ))}
  //     </>
  //   )
  // }

  return mapRef ? (
    <MapView
      ref={mapRef}
      style={styles.overlap}
      provider={PROVIDER_GOOGLE}
      initialCamera={NUSCoordinates}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
    ></MapView>
  ) : null
}

export default Map
