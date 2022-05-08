import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import MapView from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { requestForegroundPermissionsAsync } from 'expo-location'
import { Text, View } from 'react-native'
import { Modal } from 'react-native-paper'

/* navigation */
import { SOARPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { SOARContext } from '@/contexts/SOARContext'
import { map as styles } from '@/styles/fresh'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import UI from '@/components/SOAR/UI'
import SOS from '@/components/SOAR/SOS'
import { ButtonGreen } from '@/components/Buttons'

import { httpsCallable } from 'firebase/functions'

import { NUSCoordinates } from '@/data/constants'
import { getLocations } from '@/lib/SOAR'
import { UserContext } from '@/contexts/UserContext'
import { functions } from '@/sunnus/firebase'
import TimerComponent from '@/components/Timer'
import { useFocusEffect } from '@react-navigation/native'
import { QR } from '../classes/QR'

const SOARScreen = () => {
  /* read data from SOAR context */
  const {
    locationState,
    filteredState,
    QRState,
    scanningState,
    stationOrderState,
    displayLocationState,
  } = useContext(SOARContext)
  const { teamName, teamData } = useContext(UserContext)

  const locations = locationState[0]
  const stationOrder = stationOrderState[0]
  const setIsScanning = scanningState[1]

  // unpack states
  const [filtered, setFiltered] = filteredState
  const [qr, setQr] = QRState
  const [displayLocations, setDisplayLocations] = displayLocationState

  // local states
  const [SOSVisible, setSOSVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [everythingLoaded, setEverythingLoaded] = useState(false)
  const [startStatus, setStartStatus] = useState(false)

  // Timer stuff
  const [isRunning, setIsRunning] = useState(false)
  const [pausedAt, setPausedAt] = useState(0)
  const [timerEvents, setTimerEvents] = useState<Array<number>>([])

  const [cameraPermission, setCameraPermission] = useState('')
  const [checkingCameraPermission, setCheckingCameraPermission] =
    useState(false)

  const mapRef = useRef<MapView | null>(null)

  const navigation = useNavigation<SOARPage<'SOARScreen'>>()

  const flyToNUS = () => {
    if (mapRef.current) {
      mapRef.current.animateCamera(NUSCoordinates, { duration: 500 })
    }
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

  /* =====================================================
   *          HANDLES TOGGLING OF ADMIN STATIONS
   * =====================================================
   */

  /* update display locations if admin station toggle has been pressed
   * (this calls setFiltered and changes filtered)
   */
  useEffect(() => {
    if (everythingLoaded === true) {
      setDisplayLocations(getLocations(locations, filtered, teamData))
    }
  }, [everythingLoaded, filtered])

  function toggleAdminStations() {
    const obj = filtered
    obj.water = !obj.water
    setFiltered(obj)
    setDisplayLocations(getLocations(locations, obj, teamData))
  }

  /* =====
   * TIMER
   * =====
   */

  const Timer = () => {
    if (!everythingLoaded) {
      return null
    }
    return (
      <TimerComponent
        SOARTimerEvents={timerEvents}
        pausedAt={pausedAt}
        isRunning={isRunning}
      />
    )
  }

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
    console.log('confirming QR Action ...')
    console.log(qr)
    // final checks for QR validity
    // add the teamname?
    // send a request to firebase
    // set the QR to empty
    const QRApi = httpsCallable(functions, 'QRApi')
    QRApi({
      station: qr.station,
      command: qr.command,
      facilitator: qr.facilitator,
      teamName: 'developer_team',
      points: qr.points,
    }).then((result) => {
      const data = result.data
      console.log('data', data)
    })
    setQr(QR.empty)
  }

  const QRModal = () => {
    return qr === QR.empty ? null : (
      <Modal
        visible={true}
        dismissable={true}
        onDismiss={() => setQr(QR.empty)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{qr.command}</Text>
          <View style={{ marginBottom: 10 }}></View>
          <Text style={styles.centered}>{qr.command}</Text>
          <View style={{ marginBottom: 10 }}></View>
          <ButtonGreen onPress={confirmQRAction}>{qr.command}</ButtonGreen>
        </View>
      </Modal>
    )
  }

  /* =====================================================
   *                  LOAD STATE CHECKER
   * =====================================================
   */

  useFocusEffect(
    useCallback(() => {
      console.debug('focused on SOAR screen')
      setEverythingLoaded(false)
      if (
        teamName &&
        stationOrder.A.length > 0 &&
        teamData.teamName.length > 0
      ) {
        setEverythingLoaded(true)
      }
      return () => {
        console.debug('unfocused SOAR screen')
        setEverythingLoaded(false)
      }
    }, [teamName, stationOrder, teamData])
  )

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
            flyToNUS={flyToNUS}
            handleSOS={() => setSOSVisible(!SOSVisible)}
            openQRScanner={openQRScanner}
            toggleAdminStations={toggleAdminStations}
            Timer={Timer}
          />
          <HandleCameraPermission />
          <QRModal />
        </NoTouchDiv>
      </RootSiblingParent>
    )
  }
}

export default SOARScreen
