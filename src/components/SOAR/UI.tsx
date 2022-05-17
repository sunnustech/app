import { map as styles } from '@/styles/fresh'
import SOS from '@/components/SOAR/SOS'
import { NoTouchDiv as NView, Overlap } from '@/components/Views'
import { Buttons } from '@/components/SOAR'
import { AuthPage, SOARPage } from '@/types/navigation'
import { useContext, useEffect, useState } from 'react'
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner'
import Timer from '@/components/Timer'
import { SOARContext } from '@/contexts/SOARContext'
import Points from '@/components/SOAR/Points'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

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
    const middlePercent = 55
    const sidePercent = (100 - middlePercent) / 2
    return (
      <NView style={{ flexDirection: 'row' }}>
        <NView style={{ width: `${sidePercent}%` }}>
          <Buttons.Back onPress={() => navigation.navigate('HomeScreen')} />
        </NView>
        <NView style={{ width: `${middlePercent}%` }}>
          <Timer team={team} />
          <Points team={team} />
        </NView>
      </NView>
    )
  }

  const BottomUI = () => {
    return (
      <NView style={styles.mapBottomContainer}>
        <NView style={styles.mapLeftContainer}>
          <NView style={styles.flex1} />
          <Buttons.SOS onPress={() => setSOSVisible(!SOSVisible)} />
        </NView>
        <NView style={styles.mapRightContainer}>
          <Buttons.GoToSchool onPress={flyToNUS} />
          <Buttons.QR onPress={openQRScanner} />
        </NView>
      </NView>
    )
  }

  return (
    <Overlap>
      <SOS visible={SOSVisible} setState={setSOSVisible} />
      <NView style={styles.mapUIContainer}>
        <TopUI />
        <NView style={{flex: 1}}/>
        <BottomUI />
      </NView>
    </Overlap>
  )
}

export default UI
