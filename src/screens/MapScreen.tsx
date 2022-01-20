import { useEffect, useState } from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import * as Location from 'expo-location'

interface Region {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

const sentosaDefault: Region = {
  latitude: 1.254206,
  longitude: 103.819977,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState(sentosaDefault)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission Denied!')
        return
      }
      let location = Location.getCurrentPositionAsync().then(e => {
        console.log(e)
      })
      // console.log(location)
      // const r = {
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // }
      setRegion(sentosaDefault)
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={'google'}
          initialRegion={region}
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
              latitude: 1.250,
              longitude: 103.82,
            }}
            title="test marker"
            description="test description"
          >
            <View>
              <Text>Custom Label</Text>
            </View>
          </Marker>
            <Marker
              key={3}
              coordinate={{
                latitude: 1.258,
                longitude: 103.82,
              }}
            >
              <View>
                <Text>Custom Label + Custom Callout</Text>
              </View>
              <Callout>
                <View>
                  <Text>Callout Contents</Text>
                </View>
              </Callout>
            </Marker>
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
