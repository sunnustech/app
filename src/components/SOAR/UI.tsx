import { map as styles } from '@/styles/fresh'
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
import { Dispatch, SetStateAction } from 'react'

type Props = {
  navigation: AuthPage<'SOARNavigator'>
  handleSOS: () => void
  Timer: React.FC
  setIsScanning: Dispatch<SetStateAction<boolean>>
  setCheckingCameraPermission: Dispatch<SetStateAction<boolean>>
  flyToNUS: () => void
  cameraPermission: string
}

const UI = (props: Props) => {
  const {
    navigation,
    handleSOS,
    flyToNUS,
    Timer,
    setIsScanning,
    setCheckingCameraPermission,
    cameraPermission,
  } = props

  function openQRScanner() {
    setIsScanning(true)
    setCheckingCameraPermission(true)
    if (cameraPermission === 'granted') {
      navigation.navigate('QRScreen')
    }
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
          <MapSOSButton onPress={handleSOS} />
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
      <NoTouchDiv style={styles.mapUIContainer}>
        <TopUI />
        <BottomUI />
      </NoTouchDiv>
    </Overlap>
  )
}

export default UI
