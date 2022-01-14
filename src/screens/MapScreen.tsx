import { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
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
      let location = await Location.getCurrentPositionAsync()
      console.log(location)
      const r = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      setRegion(r)
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
        />
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
