import { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Callout, Camera } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import * as Location from 'expo-location'
import { Fontisto } from '@expo/vector-icons'

/* navigation */
import { RootStackParamList } from '@/sunnus/App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

type NavType = NSNP<RootStackParamList, 'Home'>

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

const CustomMarker = ({ navigation }: { navigation: NavType }) => {
  return (
    <Marker
      key={3}
      coordinate={{
        latitude: 1.258,
        longitude: 103.82,
      }}
    >
      <Fontisto name="beach-slipper" size={42} color="#ef4444" />
      <Callout
        style={styles.callout}
        onPress={() => navigation.push('Notifications')}
      >
        <View>
          <Text>
            So you have pressed the pin. Press anywhere on this callout to
            navigate to the Notification Screen.
          </Text>
        </View>
      </Callout>
    </Marker>
  )
}

const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<MapView>(null)

  const navigation = useNavigation<NavType>()

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission Denied!')
        return
      }
      Location.getCurrentPositionAsync().then((e) => {
        console.log(e)
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
        // mapRef.current?.animateCamera(r, { duration: 2000 })
      })
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={'google'}
          initialCamera={sentosaDefault}
          showsUserLocation={true}
        >
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
              latitude: 1.25,
              longitude: 103.82,
            }}
            title="test marker"
            description="test description"
          >
            <View>
              <Text>Custom Label</Text>
            </View>
          </Marker>
          <CustomMarker navigation={navigation} />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  callout: {
    width: 200,
    height: 200,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
