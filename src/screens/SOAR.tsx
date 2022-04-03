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
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/sunnus/firebase'
import { Group } from '@/types/participants'

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
  const [everythingLoaded, setEverythingLoaded] = useState(false)

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

  function getLocations(
    locations: Array<SOARLocation>,
    filtered: any,
    soarData: SOARTeamData
  ) {
    const stationsCompleted = soarData.stationsCompleted

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
    const nextStationTitle = soarData.stationsRemaining[0]

    gameStations.forEach((stn) => {
      if (stationsCompleted.includes(stn.title)) {
        stn.status = 'done'
      } else if (stn.title === nextStationTitle) {
        stn.status = 'next'
      }
    })

    // console.log('groupStationOrder', groupStationOrder)
    // console.log('stationsCompleted', stationsCompleted)

    /* apply water/medic station filter */
    return [...noGames, ...gameStations].filter(
      (loc) => filtered[loc.stationType]
    )
  }

  /* =====================================================
   *          HANDLES TOGGLING OF ADMIN STATIONS
   * =====================================================
   */

  /* update display locations if admin station toggle has been pressed
   * (this calls setFiltered and changes filtered)
   */
  useEffect(() => {
    if (everythingLoaded === true) {
      setDisplayLocations(getLocations(locations, filtered, teamData.SOAR))
    }
  }, [everythingLoaded, filtered])

  function toggleAdminStations() {
    const obj = filtered
    obj.water = !obj.water
    setFiltered(obj)
    setDisplayLocations(getLocations(locations, obj, teamData.SOAR))
  }

  /* =====================================================
   * HANDLES ACROSS-THE-TEAM UPDATING OF NEXT GAME STATION
   * =====================================================
   */

  // run only once, after teamName and stationOrder has loaded,
  // to attach a listener to firebase
  useEffect(() => {
    console.log('ran once')
    if (everythingLoaded === true) {
      onSnapshot(doc(db, 'participants', teamName), (doc) => {
        const liveData = doc.data()
        if (liveData) {
          const updatedTeamData: Group = {
            groupTitle: liveData.groupTitle,
            SOAR: liveData.SOAR,
            members: liveData.members,
            registeredEvents: liveData.registeredEvents,
          }
          console.log('took a snapshot', updatedTeamData.SOAR.stationsCompleted)
          setDisplayLocations(
            getLocations(locations, filtered, updatedTeamData.SOAR)
          )
        }
      })
    }
  }, [everythingLoaded])

  /* =====================================================
   *            HANDLES QR SCANNER INTERACTIONS
   * =====================================================
   */

  function openQRScanner() {
    setIsScanning(true)
    navigation.navigate('QRScreen')
  }

  function confirmQRAction() {
    // skip execution for invalid QRs
    if (QR.title === 'invalid QR') {
      return
    }
    soar[QR.command](teamName, QR)
    setQR(emptyQR)
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

  /* =====================================================
   *                  LOAD STATE CHECKER
   * =====================================================
   */

  useEffect(() => {
    if (
      teamName &&
      stationOrder.A.length > 0 &&
      teamData.groupTitle.length > 0
    ) {
      console.log('loading done', teamName, stationOrder)
      setEverythingLoaded(true)
    }
  }, [teamName, stationOrder, teamData])

  /* =====================================================
   *            MAIN RENDER COMPONENT FOR SOAR
   * =====================================================
   */

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
          <UI
            navigation={navigation}
            filtered={filtered}
            flyToCurrentLocation={flyToCurrentLocation}
            handleSOS={() => setSOSVisible(!SOSVisible)}
            openQRScanner={openQRScanner}
            toggleAdminStations={toggleAdminStations}
          />
          <QRHandler />
        </NoTouchDiv>
      </RootSiblingParent>
    )
  }
}

export default SOARScreen
