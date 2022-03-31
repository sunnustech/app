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
import { QRMap } from '@/data/constants'

const QRScreen = () => {
  const [cameraPermission, setCameraPermission] = useState('')
  const { QRState } = useContext(SoarContext)
  const setQRString = QRState[1]

  const navigation = useNavigation<DNP<DrawerPages, 'QRScreen'>>()

  const enableCameraPermission = () => {
    ;(async () => {
      let { status } = await BarCodeScanner.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Please enable the camera to keep using the app!')
        return
      }
      setCameraPermission('granted')
    })()
  }

  // run once
  useEffect(() => {
    enableCameraPermission()
  }, [])

  const handleBarCode = (code: BarCodeEvent) => {
    if (!Object.keys(QRMap).includes(code.data)) {
      console.log('invalid QR scanned') // perma
      return
    }

    setQRString(code.data)
    navigation.navigate('SOAR')
  }

  if (cameraPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>It seems like camera access wasn't granted. :c</Text>
        <Button onPress={() => enableCameraPermission()}>
          Click to enable permissions!
        </Button>
      </View>
    )
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

  return (
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
  )
}

export default QRScreen
