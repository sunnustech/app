import { map as styles } from '@/styles/fresh'
import SOS from '@/components/SOAR/SOS'
import { NoTouchDiv, Overlap } from '@/components/Views'
import { Ionicons as IC, MaterialIcons as MI } from '@expo/vector-icons'
import {
  MapBottomButton,
  MapNavigationButton,
  MapSOSButton,
} from '@/components/SOAR'
import { MapGoToSchoolButton } from '@/components/SOAR/MapButtons'
import SOAR from '@/lib/SOAR'
import { QRCommands as q } from '@/lib/SOAR/QRCommands'
import { AuthPage } from '@/types/navigation'
import { useEffect, useState } from 'react'
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner'

type Props = {
  navigation: AuthPage<'SOARNavigator'>
  Timer: React.FC
  flyToNUS: () => void
}

const UI = (props: Props) => {
  const { navigation, flyToNUS, Timer } = props

  const [cameraPermission, setCameraPermission] = useState<PermissionStatus>()
  const [SOSVisible, setSOSVisible] = useState<boolean>(false)

  // pre-emptively fetches for camera permissions once
  useEffect(() => {
    BarCodeScanner.getPermissionsAsync().then((res) => {
      setCameraPermission(res.status)
      console.debug('current camera permissions:', res.status)
    })
  }, [])

  /** opens QR scanner */
  function openQRScanner() {
    /** if granted, send it */
    if (cameraPermission === 'granted') {
      navigation.navigate('QRScreen')
      return
    }
    /** else, ask for permission */
    BarCodeScanner.requestPermissionsAsync().then((res) => {
      setCameraPermission(res.status)
      if (res.status !== 'granted') {
        alert(
          'Camera permissions denied.\nPlease head over to system\nsettings to re-enable.'
        )
        return
      }
      navigation.navigate('QRScreen')
    })
  }

  const TopUI = () => {
    function backToHomeScreen() {
      navigation.navigate('HomeScreen')
    }
    return (
      <NoTouchDiv style={styles.mapTopContainer}>
        <Overlap>
          <NoTouchDiv style={styles.timerContainer}>
            <Timer />
          </NoTouchDiv>
        </Overlap>
        <Overlap>
          <NoTouchDiv style={styles.navigationContainer}>
            <MapNavigationButton
              icon={[IC, 'arrow-back']}
              onPress={backToHomeScreen}
            />
          </NoTouchDiv>
        </Overlap>
      </NoTouchDiv>
    )
  }

  const Debug = () => {
    return (
      <>
        <MapSOSButton onPress={() => SOAR.start('Dev_loper', q.start)} />
        <MapSOSButton onPress={() => SOAR.pause('Dev_loper', q.pause)} />
        <MapSOSButton onPress={() => SOAR.resume('Dev_loper', q.resume)} />
        <MapSOSButton
          onPress={() => SOAR.stopFinal('Dev_loper', q.stopFinal)}
        />
      </>
    )
  }

  const debug = false

  const BottomUI = () => {
    return (
      <NoTouchDiv style={styles.mapBottomContainer}>
        <NoTouchDiv style={styles.mapLeftContainer}>
          <NoTouchDiv style={styles.flex1} />
          <MapSOSButton onPress={() => setSOSVisible(!SOSVisible)} />
        </NoTouchDiv>
        <NoTouchDiv style={styles.mapRightContainer}>
          {debug ? <Debug /> : null}
          <MapGoToSchoolButton onPress={flyToNUS} />
          <MapBottomButton icon={[MI, 'qr-code']} onPress={openQRScanner} />
        </NoTouchDiv>
      </NoTouchDiv>
    )
  }

  return (
    <Overlap>
      <SOS visible={SOSVisible} setState={setSOSVisible} />
      <NoTouchDiv style={styles.mapUIContainer}>
        <TopUI />
        <BottomUI />
      </NoTouchDiv>
    </Overlap>
  )
}

export default UI
