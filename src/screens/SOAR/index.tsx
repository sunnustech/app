import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { Text } from 'react-native'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { SoarContext } from '@/contexts/SoarContext'
import { map as styles } from '@/styles/fresh'
import { notificationInit } from '@/lib/notifications'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import UI from '@/components/SOAR/UI'

const SOARScreen = () => {
  /* read data from soar context */
  const { locationState, filteredState, loadingState } = useContext(SoarContext)

  const locations = locationState[0]
  const isLoading = loadingState[0]
  const [filtered, setFiltered] = filteredState
  const [displayLocations, setDisplayLocations] = useState<any>([])

  const mapRef = useRef<MapView>()

  notificationInit()
  const navigation = useNavigation<DrawerNavigationProp<DrawerPages, 'SOAR'>>()
  // const a: number = navigation
  const [loading, setLoading] = useState(true)
  const [currentPosition, setCurrentPosition] = useState<Camera>({
    center: { latitude: 1.296674, longitude: 103.77639 },
    pitch: 0,
    zoom: 15.3,
    heading: 0,
    altitude: 0,
  })

  // first time grab user location
  useEffect(() => {
    getCurrentPositionAsync().then((e) => {
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
      setCurrentPosition(r)
      console.log('first-grab user position:', r)
    })
  }, [])

  const flyToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateCamera(currentPosition, { duration: 500 })
    }
    getCurrentPositionAsync().then((e) => {
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
      setCurrentPosition(r)
    })
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission Denied!')
        return
      }
      setLoading(false)
    })()
  }, [])

  const toggleAdminStations = () => {
    const obj = filtered
    obj.water = !obj.water
    setFiltered(obj)
    setDisplayLocations(getLocations(locations, obj))
    console.log('map: pressed <toggleAdminStations>') // perma
  }

  const openQRScanner = () => {
    console.log('handle opening QR scanner') // perma
  }

  const handleSOS = () => {
    console.log('handle opening SOS screen') // perma
  }

  function getLocations(locations: any, filtered: any) {
    // use filteredState and locationState to determine a final array of locations to expose to the map
    return locations.filter((location: any) => filtered[location.type])
  }

  useEffect(() => {
    if (loadingState[0] === false) {
      const newLocs = getLocations(locations, filtered)
      setDisplayLocations(newLocs)
    }
  }, [filtered, isLoading])

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <NoTouchDiv style={styles.container}>
        <Map
          mapRef={mapRef}
          navigation={navigation}
          displayLocations={displayLocations}
        />
        <UI
          navigation={navigation}
          filtered={filtered}
          flyToCurrentLocation={flyToCurrentLocation}
          handleSOS={handleSOS}
          openQRScanner={openQRScanner}
          toggleAdminStations={toggleAdminStations}
        />
      </NoTouchDiv>
    )
  }
}

export default SOARScreen
