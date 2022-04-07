import { useContext } from 'react'
import { Text, View } from 'react-native'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

/* navigation */
import { SOARPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { QR as styles } from '@/styles/fresh'
import { Overlap } from '@/components/Views'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SOARContext } from '@/contexts/SOARContext'
import { QRIndex } from '@/lib/SOAR/QRDictionary'
import { QRCommands, invalidQR } from '@/lib/SOAR/QRCommands'
import { pullDoc } from '@/data/pull'
import { UserContext } from '@/contexts/UserContext'
import { TeamProps } from '@/types/participants'
import { QRCommandProps } from '@/types/SOAR'

const getTeamData = async (teamName: string): Promise<TeamProps> => {
  // TODO: handle errors on bad pulls
  const data = (await pullDoc({ collection: 'participants', doc: teamName }))
    ?.data
  return data
}

const QRScreen = () => {
  const { QRState, scanningState } = useContext(SOARContext)
  const { teamName } = useContext(UserContext)
  const [isScanning, setIsScanning] = scanningState
  const setQR = QRState[1]
  const navigation = useNavigation<SOARPage<'QRScreen'>>()

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
    const teamData = await getTeamData(teamName)
    const SOAR = teamData.SOAR
    const stn = data.station
    const cmd = data.command
    const rem = teamData.SOARStationsRemaining
    const com = teamData.SOARStationsCompleted
    const nextStn = rem.length > 0 ? rem[0] : ''
    const prevStn = com.length > 0 ? com[com.length - 1] : ''

    console.log('QR scanned:', QR)
    console.log('completed', com)
    console.log('remaining', rem)
    console.log('next', nextStn)
    console.log('prev', prevStn)
    console.log('this', stn)
    setQR(QR)

    function send(QRCommand: QRCommandProps) {
      setQR(QRCommand)
      navigation.navigate('SOARScreen')
    }

    /* if the team has completed SOAR, thank
     * them for participation and stop execution.
     */
    if (SOAR.stopped === true) {
      send(QRCommands.AlreadyCompletedSOAR)
      return
    }

    /* only continue if the team is at the
     * current or previous station.
     */
    if (stn !== nextStn && stn !== prevStn) {
      send(QRCommands.WrongStation)
      return
    }

    /* don't let teams start SOAR twice */
    if (cmd === 'start' && SOAR.started) {
      send(QRCommands.AlreadyStartedSOAR)
      return
    }

    /* for non-start commands, only allow for teams
     * that have started SOAR
     */
    if (cmd !== 'start' && !SOAR.started) {
      send(QRCommands.HaveNotStartedSOAR)
      return
    }

    /* don't pause the timer if already paused */
    if (cmd === 'pause' && !SOAR.timerRunning) {
      send(QRCommands.AlreadyPaused)
      return
    }

    /* don't resume the timer if already running */
    if (cmd === 'resume' && SOAR.timerRunning) {
      send(QRCommands.AlreadyResumed)
      return
    }

    /*
     * warn the user that their timer is paused,
     * and they are trying to finish, but still allow completion
     * (probably forgot to resume the timer earlier)
     */
    if (cmd === 'stopFinal' && !SOAR.timerRunning) {
      send(QRCommands.WarnStopFinal)
      return
    }

    /* warn user if they have already completed all stations */
    if (cmd === 'completeStage' && rem.length === 0) {
      send(QRCommands.AlreadyCompletedAllStations)
      return
    }

    /* don't allow stage completion if timer is paused */
    if (cmd === 'completeStage' && !SOAR.timerRunning) {
      send(QRCommands.TimerNotRunning)
      return
    }

    /* warn user if they have already completed this station */
    if (
      cmd === 'completeStage' &&
      teamData.SOARStationsCompleted.includes(stn)
    ) {
      send(QRCommands.AlreadyCompletedStation)
      return
    }

    send(QR)
    return
  }

  const BackToMap = () => {
    function closeQRScanner() {
      setIsScanning(false)
      navigation.navigate('SOARScreen')
    }
    return (
      <TouchableOpacity
        onPress={closeQRScanner}
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
          <BackToMap />
        </View>
      </Overlap>
    </View>
  ) : null
}

export default QRScreen
