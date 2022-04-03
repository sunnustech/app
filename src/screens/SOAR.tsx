import { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Camera } from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import { BarCodeScanner } from 'expo-barcode-scanner'
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
import { SOARContext } from '@/contexts/SOARContext'
import { map as styles } from '@/styles/fresh'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import UI from '@/components/SOAR/UI'
import SOS from '@/components/SOAR/SOS'
import { ButtonGreen } from '@/components/Buttons'
import { emptyQR } from '@/lib/soar/QRStaticCommands'
import { NUSCoordinates } from '@/data/constants'
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
  } = useContext(SOARContext)
  const { teamName, teamData } = useContext(UserContext)
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
  const [startStatus, setStartStatus] = useState(false)
  const [cameraPermission, setCameraPermission] = useState('')
  const [checkingCameraPermission, setCheckingCameraPermission] =
    useState(false)

  const mapRef = useRef<MapView>()

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

    /* note that groupStationOrder is a sorted array of stations
     * that the group will go to, in the order of visiting.
     *
     * so it suffices to take the first result that hasn't been completed.
     */
    const nextStationTitle = soarData.stationsRemaining[0]

    gameStations.forEach((stn) => {
      // reset status for each call
      stn.status = ''
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
          setDisplayLocations(
            getLocations(locations, filtered, updatedTeamData.SOAR)
          )
          setStartStatus(updatedTeamData.SOAR.started)
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
    setCheckingCameraPermission(true)
    if (cameraPermission === 'granted') {
      navigation.navigate('QRScreen')
    }
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
      setEverythingLoaded(true)
    }
  }, [teamName, stationOrder, teamData])

  /* =====================================================
   *                  CAMERA PERMISSIONS
   * =====================================================
   */

  const enableCameraPermission = async () => {
    setCheckingCameraPermission(false)
    let { status } = await BarCodeScanner.requestPermissionsAsync()
    if (status === 'granted') {
      setCameraPermission('granted')
    }
  }

  // run once to check for existing camera permissions
  useEffect(() => {
    enableCameraPermission()
  }, [])

  const HandleCameraPermission = () => {
    if (cameraPermission !== 'granted' && checkingCameraPermission) {
      return (
        <View style={styles.container}>
          <Modal
            visible={true}
            dismissable={true}
            onDismiss={() => setCheckingCameraPermission(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Permissions needed</Text>
              <View style={{ marginBottom: 10 }}></View>
              <Text style={styles.centered}>
                This app needs camera access for QR code scanning.
              </Text>
              <View style={{ marginBottom: 10 }}></View>
              <ButtonGreen onPress={enableCameraPermission}>
                Enable Camera
              </ButtonGreen>
            </View>
          </Modal>
        </View>
      )
    }
    return null
  }

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
            startStatus={startStatus}
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
          <HandleCameraPermission />
          <QRHandler />
        </NoTouchDiv>
      </RootSiblingParent>
    )
  }
}

export default SOARScreen
