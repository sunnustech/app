import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import * as Location from 'expo-location'
import {
  AntDesign as AD,
  Ionicons as IC,
  MaterialIcons as MI,
  MaterialCommunityIcons as MCI,
} from '@expo/vector-icons'
import { Text } from 'react-native'

/* navigation */
import { DrawerPages, SOARPageProps } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { SoarContext } from '@/contexts/SoarContext'
import { map as styles } from '@/styles/fresh'
import { notificationInit } from '@/lib/notifications'
import { NoTouchDiv, Overlap } from '@/components/Views'
import {
  Map,
  MapTopButton,
  MapBottomButton,
  MapNavigationButton,
  Timer,
} from '@/components/SOAR'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const SOARScreen = () => {
  /* read data from soar context */
  const { locationState, filteredState, loadingState } = useContext(SoarContext)

  const [filtered, setFiltered] = filteredState

  notificationInit()
  const navigation = useNavigation<DrawerNavigationProp<DrawerPages, 'SOAR'>>()
  // const a: number = navigation
  const [loading, setLoading] = useState(true)

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
      // mapRef.current?.animateCamera(r, { duration: 500 })
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

  const TopUI = () => {
    return (
      <NoTouchDiv style={styles.mapTopContainer}>
        <Overlap style={styles.mapRightContainer}>
          <MapTopButton
            icon={[MCI, 'cup-water']}
            onPress={toggleAdminStations}
          />
        </Overlap>
        <Overlap>
          <NoTouchDiv style={styles.timerContainer}>
            <Timer />
          </NoTouchDiv>
        </Overlap>
        <Overlap>
          <NoTouchDiv style={styles.navigationContainer}>
            <MapNavigationButton
              icon={[IC, 'arrow-back']}
              onPress={navigation.openDrawer}
            />
          </NoTouchDiv>
        </Overlap>
      </NoTouchDiv>
    )
  }

  const BottomUI = () => {
    return (
      <NoTouchDiv style={styles.mapBottomContainer}>
        <NoTouchDiv style={styles.mapLeftContainer}>
          <NoTouchDiv style={styles.flex1} />
          <MapBottomButton
            icon={[MCI, 'exclamation-thick']}
            onPress={handleSOS}
          />
        </NoTouchDiv>
        <NoTouchDiv style={styles.mapRightContainer}>
          <MapBottomButton icon={[MI, 'my-location']} onPress={handleSOS} />
          <MapBottomButton icon={[MI, 'qr-code']} onPress={openQRScanner} />
        </NoTouchDiv>
      </NoTouchDiv>
    )
  }

  function getLocations(locations: any, filtered: any) {
    // use filteredState and locationState to determine a final array of locations to expose to the map
    return locations.filter((location: any) => filtered[location.type])
  }

  const locations = locationState[0]

  const [displayLocations, setDisplayLocations] = useState<any>([])

  const isLoading = loadingState[0]

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
          getCurrentLocation={getCurrentLocation}
          navigation={navigation}
          displayLocations={displayLocations}
        />
        <Overlap>
          <NoTouchDiv style={styles.mapUIContainer}>
            <TopUI />
            <BottomUI />
          </NoTouchDiv>
        </Overlap>
      </NoTouchDiv>
    )
  }
}

export default SOARScreen
