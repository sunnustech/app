import { useContext } from 'react'
import { Text, View } from 'react-native'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

/* navigation */
import { DrawerPages } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp as DNP } from '@react-navigation/drawer'

/* sunnus components */
import { QR as styles } from '@/styles/fresh'
import { Overlap } from '../components/Views'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SOARContext } from '@/contexts/SOARContext'
import { QRIndex } from '@/lib/soar/QRDictionary'
import { QRStaticCommands, invalidQR } from '@/lib/soar/constants'
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
  const { QRState, scanningState } = useContext(SOARContext)
  const { teamName } = useContext(UserContext)
  const [isScanning, setIsScanning] = scanningState
  const setQR = QRState[1]
  const navigation = useNavigation<DNP<DrawerPages, 'QRScreen'>>()

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

    setQR(QR)
    console.log('QR command:', cmd)
    switch (cmd) {
      case 'pause':
        if (!soarProps.timerRunning) {
          setQR(QRStaticCommands.AlreadyPaused)
        }
        break
      case 'resume':
        if (soarProps.timerRunning) {
          setQR(QRStaticCommands.AlreadyResumed)
        }
        break
      case 'stopFinal':
        if (soarProps.stopped) {
          setQR(QRStaticCommands.AlreadyCompletedSOAR)
        } else if (!soarProps.timerRunning) {
          setQR(QRStaticCommands.WarnStopFinal)
        }
        break
      case 'completeStage':
        if (soarProps.stopped) {
          setQR(QRStaticCommands.AlreadyCompletedSOAR)
        } else if (rem.length === 0) {
          setQR(QRStaticCommands.AlreadyCompletedAllStations)
        } else if (soarProps.stationsCompleted.includes(stn)) {
          setQR(QRStaticCommands.AlreadyCompletedStation)
        } else if (stn !== correctStn) {
          setQR(QRStaticCommands.WrongStation)
        } else {
          QR.summary = `Congratuations! You have completed ${stn}!`
        }
        break
    }
    navigation.navigate('SOAR')
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
