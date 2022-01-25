import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

/* navigation */
import { RootStackParamList } from '@/sunnus/App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import styles from '@/styles/main'
import { Button } from '@/components/Buttons'

const ScanScreen = () => {
  const [cameraPermission, setCameraPermission] = useState('')
  const [scanned, setScanned] = useState(false)

  const navigation = useNavigation<NSNP<RootStackParamList, 'Scanner'>>()

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

  useEffect(() => {
    setScanned(false);
    enableCameraPermission()
  }, [])

  const handleBarCode = (code: BarCodeEvent) => {
    setScanned(true)
    let qrdata = code.data.split("_");
    // Only accept QR codes of this type
    // Codes are given in the form of:
    // sunnus_<event>_<location>_<id>
    if (qrdata.length === 4 && qrdata[0] === "sunnus") {
      // To be changed
      navigation.push("DummyTest")
      //switch
    }

    // Logger to check
    console.log(`Bar code with type ${code.type} and data ${code.data} has been scanned!`)
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

  if (scanned) {
    return (
      <View style={styles.container}>
        <Text>You should be redirected soon! If not, click the button below!</Text>
        <Button onPress={() => setScanned(false)}>
          Rescan QR
        </Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <BarCodeScanner
          onBarCodeScanned={(data) =>
            scanned ? undefined : handleBarCode(data)
          }
          style={{ height: '100%', width: 500 }}
        />
      </View>
    </View>
  )
}

export default ScanScreen
