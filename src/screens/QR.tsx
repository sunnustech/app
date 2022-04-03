import { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { QR as styles } from '@/styles/fresh'
import { Button } from '@/components/Buttons'
import { Overlap } from '../components/Views'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SoarContext } from '@/contexts/SoarContext'
import { QRIndex } from '@/data/commandMap'
import { QRStaticCommands, invalidQR, emptyQR } from '@/data/constants'
import { SOARTeamData } from '@/types/SOAR'
import { pullDoc } from '@/data/pull'
import { UserContext } from '@/contexts/UserContext'

const getSOARProps = async (groupTitle: string): Promise<SOARTeamData> => {
  // TODO: handle errors on bad pulls
  const data = (await pullDoc({ collection: 'participants', doc: groupTitle }))
    ?.data.SOAR
  return data
}

const QRScreen = () => {
  const [cameraPermission, setCameraPermission] = useState('')
  const { QRState, scanningState } = useContext(SoarContext)
  const { teamName } = useContext(UserContext)
  const [isScanning, setIsScanning] = scanningState
  const setQR = QRState[1]
  const navigation = useNavigation<DNP<DrawerPages, 'QRScreen'>>()

  /* handles camera permissions */
  // {{{
  const enableCameraPermission = async () => {
    let { status } = await BarCodeScanner.requestPermissionsAsync()
    if (status !== 'granted') {
      alert('Please enable the camera to keep using the app!')
      return
    }
    setCameraPermission('granted')
  }
  useEffect(() => {
    enableCameraPermission()
  }, [])
  if (cameraPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>It seems like camera access wasn't granted. :c</Text>
        <Button onPress={enableCameraPermission}>
          Click to enable permissions!
        </Button>
      </View>
    )
  }
  // }}}

  /*
   * check validity
   * parse encrypted string to a command object
   * doesn't process anything else
   */
  const handleQRCode = async (code: BarCodeEvent) => {
    setIsScanning(false)
    const string: string = code.data
    if (!Object.keys(QRIndex).includes(string)) {
      console.log('invalid QR scanned') // perma
      setQR(invalidQR)
      navigation.navigate('SOAR')
      return
    }
    // TODO: implement a QR code cooldown timer
    // only continue for valid QR codes
    // TODO: implement checks right here
    // to prevent showing the user the wrong Modal
    // (show errors right in the Modal)
    const data = QRIndex[string]
    const QR = QRStaticCommands[data.command]
    QR.station = data.station

    // error handling
    const soarProps = await getSOARProps(teamName)
    const stn = data.station
    const cmd = data.command
    const rem = soarProps.stationsRemaining
    const correctStn = rem.length > 0 ? rem[0] : stn

    if (cmd === 'start') {
      if (soarProps.started) {
        setQR(QRStaticCommands.AlreadyStartedSOAR)
        navigation.navigate('SOAR')
        return
      }
    } else if (!soarProps.started) {
      // for all non-start commands,
      // always check if participant has started SOAR yet
      setQR(QRStaticCommands.HaveNotStartedSOAR)
      navigation.navigate('SOAR')
      return
    }

    console.log('got past first two checks')

    switch (cmd) {
      case 'pause':
        if (!soarProps.timerRunning) {
          setQR(QRStaticCommands.AlreadyPaused)
          break
        }
      case 'resume':
        if (soarProps.timerRunning) {
          setQR(QRStaticCommands.AlreadyResumed)
          break
        }
      case 'stopFinal':
        if (soarProps.stopped) {
          setQR(QRStaticCommands.AlreadyCompletedSOAR)
          break
        } else if (!soarProps.timerRunning) {
          setQR(QRStaticCommands.WarnStopFinal)
          break
        }
      case 'completeStage':
        console.log('completing stage...')
        if (soarProps.stopped) {
          setQR(QRStaticCommands.AlreadyCompletedSOAR)
          break
        } else if (rem.length === 0) {
          setQR(QRStaticCommands.AlreadyCompletedAllStations)
          break
        } else if (soarProps.stationsCompleted.includes(stn)) {
          setQR(QRStaticCommands.AlreadyCompletedStation)
          break
        } else if (stn !== correctStn) {
          setQR(QRStaticCommands.WrongStation)
          break
        }
      default:
        // if there are no errors, send original scanned QR.
        setQR(QR)
        navigation.navigate('SOAR')
    }
  }

  const handleBackToMap = () => {
    setIsScanning(false)
    navigation.navigate('SOAR')
  }

  const BackToMap = ({ onPress }: any) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.pillButton, styles.centered]}
      >
        <Text style={styles.pillButtonText}>Back to Map</Text>
      </TouchableOpacity>
    )
  }

  return isScanning ? (
    <View style={styles.container}>
      <Overlap>
        <BarCodeScanner
          type="back"
          onBarCodeScanned={(data) => handleQRCode(data)}
          style={{ height: '100%', width: '100%' }}
        />
      </Overlap>
      <Overlap>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }} />
          <BackToMap onPress={handleBackToMap} />
        </View>
      </Overlap>
    </View>
  ) : null
}

export default QRScreen
