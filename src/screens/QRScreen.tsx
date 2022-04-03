import { useContext } from 'react'
import { Text, View } from 'react-native'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { QR as styles } from '@/styles/fresh'
import { Overlap } from '../components/Views'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SOARContext } from '@/contexts/SOARContext'
import { QRIndex } from '@/lib/SOAR/QRDictionary'
import { QRCommands, invalidQR } from '@/lib/SOAR/QRCommands'
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
  const navigation = useNavigation<AuthPage<'QRScreen'>>()

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
      navigation.navigate('SOARScreen')
      return
    }
    // TODO: implement a QR code cooldown timer
    // only continue for valid QR codes
    const data = QRIndex[string]
    const QR = QRCommands[data.command]
    QR.station = data.station

    // error handling
    const SOARProps = await getSOARProps(teamName)
    const stn = data.station
    const cmd = data.command
    const rem = SOARProps.stationsRemaining
    const correctStn = rem.length > 0 ? rem[0] : stn

    if (cmd === 'start') {
      if (SOARProps.started) {
        setQR(QRCommands.AlreadyStartedSOAR)
        navigation.navigate('SOARScreen')
        return
      }
    } else if (!SOARProps.started) {
      // for all non-start commands,
      // always check if participant has started SOAR yet
      setQR(QRCommands.HaveNotStartedSOAR)
      navigation.navigate('SOARScreen')
      return
    }

    setQR(QR)
    console.log('QR command:', cmd)
    switch (cmd) {
      case 'pause':
        if (!SOARProps.timerRunning) {
          setQR(QRCommands.AlreadyPaused)
        }
        break
      case 'resume':
        if (SOARProps.timerRunning) {
          setQR(QRCommands.AlreadyResumed)
        }
        break
      case 'stopFinal':
        if (SOARProps.stopped) {
          setQR(QRCommands.AlreadyCompletedSOAR)
        } else if (!SOARProps.timerRunning) {
          setQR(QRCommands.WarnStopFinal)
        }
        break
      case 'completeStage':
        if (SOARProps.stopped) {
          setQR(QRCommands.AlreadyCompletedSOAR)
        } else if (rem.length === 0) {
          setQR(QRCommands.AlreadyCompletedAllStations)
        } else if (SOARProps.stationsCompleted.includes(stn)) {
          setQR(QRCommands.AlreadyCompletedStation)
        } else if (stn !== correctStn) {
          setQR(QRCommands.WrongStation)
        } else {
          QR.summary = `Congratuations! You have completed ${stn}!`
        }
        break
    }
    navigation.navigate('SOARScreen')
  }

  const handleBackToMap = () => {
    setIsScanning(false)
    navigation.navigate('SOARScreen')
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
