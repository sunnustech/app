import { useContext, useEffect, useRef, useState } from 'react'
import MapView from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import { BarCodeScanner } from 'expo-barcode-scanner'
import {
  HandleCameraPermission,
  enableCameraPermission,
} from '@/components/camera/Permissions'
import { requestForegroundPermissionsAsync } from 'expo-location'
import { Text, View } from 'react-native'
import { SOARPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { SOARContext } from '@/contexts/SOARContext'
import { map as styles } from '@/styles/fresh'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import UI from '@/components/SOAR/UI'
import SOS from '@/components/SOAR/SOS'
import { ButtonGreen } from '@/components/Buttons'
import { NUSCoordinates } from '@/data/constants'
import TimerComponent from '@/components/Timer'
import { QR } from '@/classes/QR'
import QRModal from '../components/SOAR/QRModal'

const SOARScreen = () => {
  /* read data from SOAR context */
  const { QRState, scanningState } = useContext(SOARContext)

  const setIsScanning = scanningState[1]

  // unpack states
  const [qr, setQr] = QRState

  // local states
  const [SOSVisible, setSOSVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [everythingLoaded, setEverythingLoaded] = useState(false)

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
    enableCameraPermission(setCheckingCameraPermission, setCameraPermission)
    ;(async () => {
      let { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission Denied!')
        return
      }
      setLoading(false)
    })()
  }, [])

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
          <Map mapRef={mapRef} />
          <SOS visible={SOSVisible} setState={setSOSVisible} />
          <UI
            navigation={navigation}
            flyToNUS={flyToNUS}
            handleSOS={() => setSOSVisible(!SOSVisible)}
            openQRScanner={openQRScanner}
            Timer={Timer}
          />
          {HandleCameraPermission(
            cameraPermission,
            checkingCameraPermission,
            setCheckingCameraPermission,
            setCameraPermission
          )}
          <QRModal qr={qr} setQr={setQr} />
        </NoTouchDiv>
      </RootSiblingParent>
    )
  }
}

export default SOARScreen
