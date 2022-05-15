import { map as styles } from '@/styles/fresh'
import { Modal } from 'react-native-paper'
import { View, Text, Linking } from 'react-native'
import { Button } from '@/components/Buttons'
import { SOARContext } from '@/contexts/SOARContext'
import { useContext } from 'react'

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
      <View style={styles.SOSContainer}>
        <Text style={styles.SOSTitle}>Emergency</Text>
        <View style={{ marginBottom: 10 }}>
          <SOSButton onPress={handleDistressSignal}>
            Call Safety Officer
          </SOSButton>
        </View>
        <Text style={styles.centered}>
          Do call 995 directly if you deem the situation serious enough.
        </Text>
      </View>
    </Modal>
  )
}

export default SOS
