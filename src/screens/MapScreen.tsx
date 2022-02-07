import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import * as Location from 'expo-location'
import { CustomMarker } from '@/components/Markers'
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
// search for icons at [https://icons.expo.fyi/]

/* navigation */
import { RootStackParamList } from '@/sunnus/App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import styles from '@/styles/main'

/* sunnus data */
import { adminLocations } from '../data/AdminStations'
import { gameLocations } from '../data/GameStations'

/* sunnus context */
import { SoarContext } from '@/sunnus/App'

type NavType = NSNP<RootStackParamList, 'Map'>

const sentosaDefault: Camera = {
  center: {
    latitude: 1.254206,
    longitude: 103.819977,
  },
  pitch: 0,
  zoom: 15,
  heading: 0,
  altitude: 0,
}

const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const { filterLocations, updateFilterLocations } = useContext(SoarContext)
  const mapRef = useRef<MapView>(null)

  const navigation = useNavigation<NavType>()

  const getCurrentLocation = () => {
    Location.getCurrentPositionAsync().then((e) => {
      const r: Camera = {
        center: {
          latitude: e.coords.latitude,
          longitude: e.coords.longitude,
        },
        pitch: 0,
        zoom: 15,
        heading: 0,
        altitude: 0,
      }
      //mapRef.current?.animateCamera(r, { duration: 500 })
    })
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission Denied!')
        return
      }
      getCurrentLocation()
      setLoading(false)
    })()
  }, [])

  const toggleGameStations = () => {
    updateFilterLocations(gameLocations)
  }
  
  const toggleAdminStations = () => {
    updateFilterLocations(adminLocations)
  }

  const queryfromfirebase = () => {

  }

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.mapSideBarContainer}>
          <View style={styles.mapSideButton}>
            <AntDesign
              name="enviroment"
              size={24}
              color="black"
              onPress={() => toggleGameStations()}
            />
          </View>
          <View style={styles.mapSideButton}>
            <Ionicons
              name="flag"
              size={24}
              color="black"
              onPress={() => toggleGameStations()}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.currentLocationButton}>
          <MaterialIcons
            name="my-location"
            color="black"
            size={24}
            onPress={() => toggleAdminStations()}
          />
        </View>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={'google'}
          initialCamera={sentosaDefault}
          showsUserLocation={true}
          onUserLocationChange={() => getCurrentLocation()}
        >
          {filterLocations.map((e) => (
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
      </View>
    )
  }
}

export default MapScreen

/* Another button as test
<View style={styles.mapSideButton}>
          <Ionicons
            name="flag"
            size={24}
            color="black"
            onPress={() => toggleAdminStations()}
          />
        </View>
*/

/* Test Markers
<Marker
            key={1}
            coordinate={{
              latitude: 1.254,
              longitude: 103.82,
            }}
            title="pinned marker"
            description="pinned description"
          />
          <Marker
            key={2}
            coordinate={{
              latitude: 1.252,
              longitude: 103.82,
            }}
            title="test marker"
            description="test description"
          >
            <View>
              <Text>Custom Marker NO 2</Text>
            </View>
          </Marker>
*/
