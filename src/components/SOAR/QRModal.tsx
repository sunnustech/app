import { functions } from '@/sunnus/firebase'
import { map as styles } from '@/styles/fresh'
import { httpsCallable } from 'firebase/functions'
import { Text, View } from 'react-native'
import { ButtonGreen } from '@/components/Buttons'
import { Modal } from 'react-native-paper'
import { QR } from '../../classes/QR'
import { Dispatch, SetStateAction } from 'react'
import { log } from '@/utils/cli'

type Props = {
  qr: QR
  setQr: Dispatch<SetStateAction<QR>>
}

const QRModal = (props: Props) => {
  const { qr, setQr } = props
  /**
   * sends a post API request to firebase
   */
  function confirmQRAction() {
    const QRApi = httpsCallable(functions, 'QRApi')
    QRApi(qr.flatten()).then((result) => {
      const response: any = result.data
      log.yellow('firebase reponse:', response.status)
    })
    setQr(QR.empty)
  }
  return qr === QR.empty ? null : (
    <Modal visible={true} dismissable={true} onDismiss={() => setQr(QR.empty)}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{qr.command}</Text>
        <View style={{ marginBottom: 10 }}></View>
        <Text style={styles.centered}>{qr.command}</Text>
        <View style={{ marginBottom: 10 }}></View>
        <ButtonGreen onPress={confirmQRAction}>{qr.command}</ButtonGreen>
      </View>
    </Modal>
  )
}

export default QRModal
