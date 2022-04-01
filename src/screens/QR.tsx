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
import { QRStaticCommands } from '@/data/constants'

const QRScreen = () => {
  const [cameraPermission, setCameraPermission] = useState('')
  const { QRState, scanningState } = useContext(SoarContext)
  const [isScanning, setIsScanning] = scanningState
  const setCommand = QRState[1]
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
   * parse encrypted string to a command
   * doesn't process anything else
   */
  const handleBarCode = (code: BarCodeEvent) => {
    const string: string = code.data
    setIsScanning(false)
    if (!Object.keys(QRStaticCommands).includes(string)) {
      console.warn('invalid QR scanned') // perma
      setCommand('invalid')
      navigation.navigate('SOAR')
      return undefined
    }
    // TODO: implement a QR code cooldown timer
    // only continue for valid QR codes
    setCommand(string)
    console.log('handleBarCode', string)
    navigation.navigate('SOAR')
    return undefined
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
          onBarCodeScanned={(data) => handleBarCode(data)}
          style={{ height: '100%', width: '100%' }}
        />
      </Overlap>
      <Overlap>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }} />
          <BackToMap onPress={() => navigation.navigate('SOAR')} />
        </View>
      </Overlap>
    </View>
  ) : null
}

export default QRScreen
