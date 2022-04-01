import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { Text, View } from 'react-native'
import { Modal } from 'react-native-paper'

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
import SOS from '@/components/SOAR/SOS'
import { ButtonGreen } from '../components/Buttons'
import { NUSCoordinates, QRStaticCommands, emptyQR } from '@/data/constants'

const SOARScreen = () => {
  /* read data from soar context */
  const { locationState, filteredState, loadingState, QRState, scanningState } =
    useContext(SoarContext)

  const locations = locationState[0]
  const isLoading = loadingState[0]
  const [filtered, setFiltered] = filteredState
  const [displayLocations, setDisplayLocations] = useState<any>([])
  const [SOSVisible, setSOSVisible] = useState<boolean>(false)
  const [QR, setQR] = QRState
  const [loading, setLoading] = useState(true)
  const [isScanning, setIsScanning] = scanningState
  const [currentPosition, setCurrentPosition] = useState<Camera>(NUSCoordinates)

  const mapRef = useRef<MapView>()

  notificationInit()
  const navigation = useNavigation<DrawerNavigationProp<DrawerPages, 'SOAR'>>()

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
    setIsScanning(true)
    navigation.navigate('QRScreen')
    console.log('handle opening QR scanner') // perma
  }

  const handleSOS = () => {
    setSOSVisible(!SOSVisible)
    console.log('handle opening SOS screen') // perma
  }

  function getLocations(locations: any, filtered: any) {
    // use filteredState and locationState to determine a final array of locations to expose to the map
    return locations.filter((location: any) => filtered[location.type])
  }

  useEffect(() => {
    if (isLoading === false) {
      const newLocs = getLocations(locations, filtered)
      setDisplayLocations(newLocs)
    }
  }, [filtered, isLoading])

  function handleQRFunction() {
    console.log('handleQRFunction') // perma
    setQR(emptyQR)
  }

  const QRHandler = () => {
    console.log('called QRHandler', QR)
    const display =
      QR === emptyQR
        ? {
            title: 'invalid QR',
            summary: 'The QR code scanned is not in our index',
            action: 'Continue',
          }
        : QRStaticCommands[QR.command]
    return QR === emptyQR ? null : (
      <Modal visible={true} dismissable={true} onDismiss={() => setQR(emptyQR)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{display.title}</Text>
          <View style={{ marginBottom: 10 }}></View>
          <Text style={styles.centered}>{display.summary}</Text>
          <View style={{ marginBottom: 10 }}></View>
          <ButtonGreen onPress={handleQRFunction}>{display.action}</ButtonGreen>
        </View>
      </Modal>
    )
  }

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
        <SOS visible={SOSVisible} setState={setSOSVisible} />
        <QRHandler />
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
