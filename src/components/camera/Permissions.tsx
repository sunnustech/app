import { View, Text, PermissionStatus } from 'react-native'
import { Modal } from 'react-native-paper'
import { map as styles } from '@/styles/fresh'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { ButtonGreen } from '@/components/Buttons'
import { Dispatch, SetStateAction } from 'react'

export const enableCameraPermission = async (
  setCheckingCameraPermission: Dispatch<SetStateAction<boolean>>,
  setCameraPermission: Dispatch<SetStateAction<PermissionStatus>>
) => {
  setCheckingCameraPermission(false)
  let { status } = await BarCodeScanner.requestPermissionsAsync()
  if (status === 'granted') {
    setCameraPermission('granted')
  }
}

export const HandleCameraPermission = (
  cameraPermission: string,
  checkingCameraPermission: boolean,
  setCheckingCameraPermission: Dispatch<SetStateAction<boolean>>,
  setCameraPermission: Dispatch<SetStateAction<PermissionStatus>>
) => {
  if (cameraPermission !== 'granted' && checkingCameraPermission) {
    return (
      <View style={styles.container}>
        <Modal
          visible={true}
          dismissable={true}
          onDismiss={() => setCheckingCameraPermission(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Permissions needed</Text>
            <View style={{ marginBottom: 10 }}></View>
            <Text style={styles.centered}>
              This app needs camera access for QR code scanning.
            </Text>
            <View style={{ marginBottom: 10 }}></View>
            <ButtonGreen
              onPress={() =>
                enableCameraPermission(
                  setCheckingCameraPermission,
                  setCameraPermission
                )
              }
            >
              Enable Camera
            </ButtonGreen>
          </View>
        </Modal>
      </View>
    )
  }
  return null
}
