import { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Callout, Camera } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import * as Location from 'expo-location'
import { Fontisto } from '@expo/vector-icons'

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

const CustomMarker = () => {
  return (
    <Marker
      key={3}
      coordinate={{
        latitude: 1.258,
        longitude: 103.82,
      }}
    >
      <Fontisto name="beach-slipper" size={42} color="#ef4444"/>
      <Callout>
        <View>
          <Text>Callout Contents</Text>
        </View>
      </Callout>
    </Marker>
  )
}

const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<MapView>(null)

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
          <CustomMarker />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
