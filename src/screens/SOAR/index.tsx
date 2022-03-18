import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import * as Location from 'expo-location'
import {
  AntDesign as AD,
  Ionicons as IC,
  MaterialIcons as MI,
  MaterialCommunityIcons as MCI,
} from '@expo/vector-icons'
import { Text, View } from 'react-native'

/* navigation */
import { SOARPageProps } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { SoarContext } from '@/contexts/SoarContext'
import { map as styles } from '@/styles/fresh'
import { notificationInit } from '@/lib/notifications'
import MapButton from '@/components/SOAR/MapButton'
import Map from '@/components/SOAR/Map'

const SOARScreen = () => {
  /* read data from soar context */
  const {
    filterLocations,
    updateFilterLocations,
    gameLocations,
    adminLocations,
  } = useContext(SoarContext)

  notificationInit()
  const navigation = useNavigation<SOARPageProps>()
  // const a: number = navigation
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<MapView>(null)

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

  const toggleGameStations = () => {
    console.log('map: pressed <toggleGameStations>')
    updateFilterLocations(gameLocations)
  }

  const toggleAdminStations = () => {
    console.log('map: pressed <toggleAdminStations>')
    updateFilterLocations(adminLocations)
  }

  const openQRScanner = () => {
    console.log('handle opening QR scanner')
  }

  const handleSOS = () => {
    console.log('handle opening SOS screen')
  }

  const TopUI = () => {
    return (
      <View style={styles.mapTopContainer} pointerEvents="box-none">
        <MapButton icon={[AD, 'enviroment']} onPress={toggleGameStations} />
        <MapButton icon={[IC, 'flag']} onPress={toggleAdminStations} />
      </View>
    )
  }

  const BottomUI = () => {
    return (
      <View style={styles.mapBottomContainer} pointerEvents="box-none">
        <View style={styles.mapLeftContainer}>
          <View style={styles.flex1} />
          <MapButton icon={[MCI, 'exclamation-thick']} onPress={handleSOS} />
        </View>
        <View style={styles.mapRightContainer}>
          <MapButton icon={[MI, 'my-location']} onPress={handleSOS} />
          <MapButton icon={[MI, 'qr-code']} onPress={openQRScanner} />
        </View>
      </View>
    )
  }

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <View style={styles.container}>
        <Map
          ref={mapRef}
          getCurrentLocation={getCurrentLocation}
          navigation={navigation}
          filterLocations={filterLocations}
        />
        <View style={styles.overlap} pointerEvents="box-none">
          <View style={styles.mapUIContainer} pointerEvents="box-none">
            <TopUI />
            <BottomUI />
          </View>
        </View>
      </View>
    )
  }
}

export default SOARScreen
