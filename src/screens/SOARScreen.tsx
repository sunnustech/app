import { useContext, useEffect, useRef, useState } from 'react'
import MapView from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import {
  HandleCameraPermission,
  enableCameraPermission,
} from '@/components/camera/Permissions'
import { requestForegroundPermissionsAsync } from 'expo-location'
import { Text } from 'react-native'
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { SOARContext } from '@/contexts/SOARContext'
import { map as styles } from '@/styles/fresh'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import UI from '@/components/SOAR/UI'
import { NUSCoordinates } from '@/data/constants'
import TimerComponent from '@/components/Timer'
import QRModal from '@/components/SOAR/QRModal'

const SOARScreen = () => {
  /* read data from SOAR context */
  const { QRState, scanningState } = useContext(SOARContext)

  const setIsScanning = scanningState[1]

  // unpack states
  const [qr, setQr] = QRState

  // local states
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
  const navigation = useNavigation<AuthPage<'SOARNavigator'>>()

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

  const props = {
    UI: {
      navigation,
      flyToNUS,
      Timer,
      setIsScanning,
      setCheckingCameraPermission,
      cameraPermission,
    },
  }

  if (loading) {
    return <Text>loading...</Text>
  } else {
    return (
      <RootSiblingParent>
        <NoTouchDiv style={styles.container}>
          <Map mapRef={mapRef} />
          <UI {...props.UI} />
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
