import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
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
import { NUSCoordinates, emptyQR } from '@/data/constants'
import soar from '@/lib/soar'
import { UserContext } from '@/contexts/UserContext'
import { SOARLocation, SOARTeamData } from '@/types/SOAR'

const SOARScreen = () => {
  /* read data from soar context */
  const {
    locationState,
    filteredState,
    QRState,
    scanningState,
    stationOrderState,
  } = useContext(SoarContext)
  const { teamName, teamData, setTeamData } = useContext(UserContext)
  const displayLocationState = useState<Array<SOARLocation>>([])

  const locations = locationState[0]
  const stationOrder = stationOrderState[0]
  const setIsScanning = scanningState[1]

  // unpack states
  const [filtered, setFiltered] = filteredState
  const [QR, setQR] = QRState
  const [displayLocations, setDisplayLocations] = displayLocationState

  // local states
  const [SOSVisible, setSOSVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [currentPosition, setCurrentPosition] = useState<Camera>(NUSCoordinates)
  const [nextStation, setNextStation] = useState(true)

  const mapRef = useRef<MapView>()

  notificationInit()
  const navigation = useNavigation<DrawerNavigationProp<DrawerPages, 'SOAR'>>()

  // first time grab user location
  useEffect(() => {
    getCurrentPositionAsync().then((e) => {
      const r: Camera = {
        center: { latitude: e.coords.latitude, longitude: e.coords.longitude },
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
        center: { latitude: e.coords.latitude, longitude: e.coords.longitude },
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
    setDisplayLocations(getLocations(locations, obj, teamData.SOAR))
  }

  const openQRScanner = () => {
    setIsScanning(true)
    navigation.navigate('QRScreen')
  }

  const handleSOS = () => {
    setSOSVisible(!SOSVisible)
  }

  function getLocations(
    locations: Array<SOARLocation>,
    filtered: any,
    soarData: SOARTeamData
  ) {
    const stationsCompleted = soarData.stationsCompleted
    const groupStationOrder = stationOrder[soarData.direction]

    /* remove all game stations (so we only add in the next game station) */
    const noGames = locations.filter((loc) => loc.stationType !== 'game')

    const gameStations: Array<SOARLocation> = locations.filter(
      (loc) => loc.stationType === 'game'
    )

    gameStations.forEach((stn) => {
      if (stationsCompleted.includes(stn.title)) {
        stn.status = 'done'
      }
    })

    /* note that groupStationOrder is a sorted array of stations
     * that the group will go to, in the order of visiting.
     *
     * so it suffices to take the first result that hasn't been completed.
     */
    const nextStationTitle = groupStationOrder.filter(
      (stn) => !stationsCompleted.includes(stn)
    )[0]

    gameStations.forEach((stn) => {
      if (stationsCompleted.includes(stn.title)) {
        stn.status = 'done'
      } else if (stn.title === nextStationTitle) {
        stn.status = 'next'
      }
    })

    /* apply water/medic station filter */
    return [...noGames, ...gameStations].filter(
      (loc) => filtered[loc.stationType]
    )
  }

  /* update display locations if:
   * 1. admin station toggle has been pressed (this changes filtered)
   * , OR
   * 2. teamData received updates
   */
  useEffect(() => {
    if (teamData.SOAR) {
      setDisplayLocations(getLocations(locations, filtered, teamData.SOAR))
    }
  }, [filtered, teamData])

  /*  update display locations whenever nextStation's value is updated */
  useEffect(() => {
    if (teamData.SOAR && QR !== emptyQR) {
      const newData = teamData.SOAR
      newData.stationsCompleted.push(QR.station)
      setDisplayLocations(getLocations(locations, filtered, newData))
    }
    setQR(emptyQR)
  }, [nextStation])

  function confirmQRAction() {
    // skip execution for invalid QRs
    if (QR.title === 'invalid QR') {
      return
    }

    if (QR.command == 'completeStage') {
      soar[QR.command](teamName, QR, [teamData, setTeamData])
      /* trigger the useEffect to reload displayLocations
       * note that this useEffect also runs setQR(emptyQR)
       */
      setNextStation(!nextStation)
    } else {
      setQR(emptyQR)
      soar[QR.command](teamName, QR)
    }
  }

  const QRHandler = () => {
    return QR === emptyQR ? null : (
      <Modal visible={true} dismissable={true} onDismiss={() => setQR(emptyQR)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{QR.title}</Text>
          <View style={{ marginBottom: 10 }}></View>
          <Text style={styles.centered}>{QR.summary}</Text>
          <View style={{ marginBottom: 10 }}></View>
          <ButtonGreen onPress={confirmQRAction}>{QR.action}</ButtonGreen>
        </View>
      </Modal>
    )
  }

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <RootSiblingParent>
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
      </RootSiblingParent>
    )
  }
}

export default SOARScreen
