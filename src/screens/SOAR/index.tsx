import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import * as Location from 'expo-location'
import { CustomMarker } from '@/components/Markers'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Text, View, TouchableOpacity } from 'react-native'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { SoarContext } from '@/contexts/SoarContext'
import { map as styles } from '@/styles/fresh'
import { notificationInit } from '@/lib/notifications'
import Gem from '@/components/SOAR/Gem'

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

const SOARScreen = () => {
  /* read data from soar context */
  const {
    filterLocations,
    updateFilterLocations,
    gameLocations,
    adminLocations,
  } = useContext(SoarContext)

  notificationInit()
  const navigation = useNavigation<DNP<DrawerPages, 'SOAR'>>()
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

  const TopRight = () => {
    return (
      <View style={styles.mapTopRightContainer} pointerEvents="box-none">
        <View style={styles.mapSideButton}>
          <AntDesign
            name="enviroment"
            size={24}
            color="black"
            onPress={toggleGameStations}
          />
        </View>
        <View style={styles.mapSideButton}>
          <Ionicons
            name="flag"
            size={24}
            color="black"
            onPress={toggleAdminStations}
          />
        </View>
      </View>
    )
  }

  const BottomRight = () => {
    return (
      <View style={styles.mapBottomRightContainer} pointerEvents="box-none">
        <View style={styles.mapSideButton}>
          <MaterialIcons
            name="my-location"
            color="black"
            size={24}
            onPress={() => toggleGameStations()}
          />
        </View>
      </View>
    )
  }

  const Map = () => {
    return (
      <MapView
        ref={mapRef}
        style={styles.overlap}
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
    )
  }

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <View style={styles.container}>
        <Map />
        <View style={styles.overlap} pointerEvents="box-none">
          <View style={styles.mapUIContainer} pointerEvents="box-none">
            <TopRight />
            <BottomRight />
          </View>
        </View>
      </View>
    )
  }
}

export default SOARScreen
