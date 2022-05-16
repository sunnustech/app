import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapPoint from '@/components/SOAR/MapPoint'
import { map as styles } from '@/styles/fresh'
import { MapProps } from '@/types/SOAR'
import { customMapStyle } from './MapStyle'
import { NUSCoordinates } from '@/data/constants'
import { SOARContext } from '@/contexts/SOARContext'
import { useContext } from 'react'
import { Location } from '@/classes/location'

const Map = ({ mapRef }: MapProps) => {
  const { teamState, gameStations } = useContext(SOARContext)
  const team = teamState[0]
  gameStations.update(team)

  const GameStations = () => {
    return team._started ? (
      <>
        {gameStations.list.map((e: Location, i: number) => (
          <MapPoint
            key={i}
            coordinate={e.getCoordinates()}
            pointType={e.type}
            content={e.details}
            status={e.status}
          />
        ))}
      </>
    ) : null
  }

  return mapRef ? (
    <MapView
      showsCompass={false}
      ref={mapRef}
      style={styles.overlap}
      provider={PROVIDER_GOOGLE}
      initialCamera={NUSCoordinates}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
    >
      <GameStations />
    </MapView>
  ) : null
}

export default Map
