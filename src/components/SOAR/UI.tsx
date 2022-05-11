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
import { AuthPage, SOARPage } from '@/types/navigation'
import { useContext, useEffect, useState } from 'react'
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner'
import Timer from '@/components/Timer'
import { SOARContext } from '@/contexts/SOARContext'
import Debug from '@/components/SOAR/Debug'
import Points from '@/components/SOAR/Points'
import { useNavigation } from '@react-navigation/native'

type Props = {
  navigation: AuthPage<'SOARNavigator'>
  flyToNUS: () => void
}

const UI = (props: Props) => {
  const { navigation, flyToNUS } = props
  const SOARnavigation = useNavigation<SOARPage<'SOARScreen'>>()
  const { teamState } = useContext(SOARContext)
  const team = teamState[0]

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
      SOARnavigation.navigate('QRScreen')
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
      SOARnavigation.navigate('QRScreen')
    })
  }

  const TopUI = () => {
    return (
      <NoTouchDiv style={styles.mapTopContainer}>
        <Overlap>
          <NoTouchDiv style={styles.timerAndPointsContainer}>
            <NoTouchDiv style={styles.timerContainer}>
              <Timer team={team} />
            </NoTouchDiv>
            <Points team={team} />
          </NoTouchDiv>
        </Overlap>
        <Overlap>
          <NoTouchDiv style={styles.navigationContainer}>
            <MapNavigationButton
              icon={[IC, 'chevron-back']}
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <NoTouchDiv style={{ flex: 1 }} />
          </NoTouchDiv>
        </Overlap>
      </NoTouchDiv>
    )
  }

  const BottomUI = () => {
    return (
      <NoTouchDiv style={styles.mapBottomContainer}>
        <NoTouchDiv style={styles.mapLeftContainer}>
          <NoTouchDiv style={styles.flex1} />
          <MapSOSButton onPress={() => setSOSVisible(!SOSVisible)} />
        </NoTouchDiv>
        <NoTouchDiv style={styles.mapRightContainer}>
          {false ? <Debug /> : null}
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
