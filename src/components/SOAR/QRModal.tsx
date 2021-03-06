import { functions } from '@/sunnus/firebase'
import { httpsCallable } from 'firebase/functions'
import { Text, View } from 'react-native'
import { Button } from '@/components/Buttons'
import { Modal } from 'react-native-paper'
import { QR } from '@/classes/QR'
import { useContext, useState } from 'react'
import { log } from '@/utils/cli'
import { SOARContext } from '@/contexts/SOARContext'
import { globalStyles } from '@/styles/global'
import { Toast } from '@/lib/utils'

const QRModal = () => {
  const { QRState } = useContext(SOARContext)
  const [qr, setQr] = QRState
  const [response, setResponse] = useState('')
  const Spacer = () => <View style={{ marginBottom: 10 }} />
  function confirmQRAction() {
    const QRApi = httpsCallable(functions, 'QRApi')
    QRApi(qr.flatten()).then((result) => {
      const response: any = result.data
      log.yellow('firebase response:', response.status)
      Toast(response.status)
    })
    setQr(QR.empty)
  }

  /**
   * this modal appears right after scanning a QR code,
   * to serve as confirmation of command
   */
  const ConfirmModal = () => {
    /**
     * sends a post API request to firebase
     */
    return (
      <Modal
        visible={true}
        dismissable={true}
        onDismiss={() => setQr(QR.empty)}
      >
        <View style={globalStyles.container.modal}>
          <Text style={globalStyles.text.modalTitle}>{qr.command}</Text>
          <Spacer />
          <Text style={{ textAlign: 'center' }}>{qr.command}</Text>
          <Spacer />
          <Button
            color="emerald"
            onPress={confirmQRAction}
            children={qr.command}
          />
        </View>
      </Modal>
    )
  }

  if (qr === QR.empty && response === '') {
    return null
  }

  if (qr !== QR.empty) {
    return <ConfirmModal />
  }

  // TODO: handle custom responses from database
  return null
}

export default QRModal
