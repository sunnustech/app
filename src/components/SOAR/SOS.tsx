import { Modal } from 'react-native-paper'
import { View, Text, Linking } from 'react-native'
import { Button } from '@/components/Buttons'
import { SOARContext } from '@/contexts/SOARContext'
import { useContext } from 'react'
import { globalStyles } from '@/styles/global'
import { VSpacer } from '@/components/utils'

const SOS = ({ visible, setState }: any) => {
  const { safetyOfficerPhoneState } = useContext(SOARContext)
  function handleDistressSignal() {
    console.debug('calling safety officer...') // perma
    Linking.openURL(`tel:${safetyOfficerPhoneState[0]}`)
  }

  const SOSButton = ({ onPress, children }: any) => {
    return <Button color="red" onPress={onPress} children={children} />
  }

  return (
    <Modal visible={visible} onDismiss={() => setState(false)}>
      <View style={globalStyles.container.modal}>
        <Text style={globalStyles.text.modalTitle}>Emergency</Text>
        <SOSButton onPress={handleDistressSignal}>
          Call Safety Officer
        </SOSButton>
        <VSpacer h={16} />
        <Text style={{ textAlign: 'center' }}>
          Do call 995 directly if you deem the situation serious enough.
        </Text>
      </View>
    </Modal>
  )
}

export default SOS
