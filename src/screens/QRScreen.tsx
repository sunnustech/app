import { useContext, useState } from 'react'
import { Text, View } from 'react-native'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'
import CryptoJS from 'crypto-js'

/* navigation */
import { SOARPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { QR as styles } from '@/styles/fresh'
import { Overlap } from '@/components/Views'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SOARContext } from '@/contexts/SOARContext'
import { invalidQR } from '@/lib/SOAR/QRCommands'
import { SOARCommand } from '@/types/SOAR'
import { QR } from '@/classes/QR'

const QRScreen = () => {
  const SALT = 'MoonNUS'
  const SEPERATOR = '_'

  const { QRState } = useContext(SOARContext)
  const setQR = QRState[1]
  const navigation = useNavigation<SOARPage<'QRScreen'>>()
  const [scanning, setScanning] = useState(true)

  /*
   * check validity
   * parse encrypted string to a command object
   * doesn't process anything else
   */
  const handleQRCode = async (code: BarCodeEvent) => {
    // Note! QRDictionary may be depreciated

    // Decrypt
    let bytes, qrData
    try {
      bytes = CryptoJS.AES.decrypt(code.data, SALT)
      qrData = bytes.toString(CryptoJS.enc.Utf8)
    } catch (err) {
      console.debug('Invalid QR!') // perma
      setQR(invalidQR)
      navigation.navigate('SOARScreen')
      return
    }
    const data = qrData.split(SEPERATOR)

    /* Guard clauses, if QR is not of correct type
     * QR are of types as defined in GeneratorScreen.tsx
     */
    if (data.length !== 4) {
      console.debug('invalid QR scanned') // perma
      setQR(invalidQR)
      navigation.navigate('SOARScreen')
      return
    }

    const [stn, cmd, points, facilitator] = data

    // TODO: implement a QR code cooldown timer

    setQR(qrData)

    const qr = new QR({
      points: parseInt(points),
      command: cmd as SOARCommand,
      station: stn,
      facilitator,
      teamName: 'developer_team', // TODO un-hardcode this
    })

    console.log(qr)

    setQR(qr)
    navigation.navigate('SOARScreen')
    return
  }

  const BackToMap = () => {
    function closeQRScanner() {
      setScanning(false)
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

  return scanning ? (
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
