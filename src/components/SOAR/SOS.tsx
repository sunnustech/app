import { map as styles } from '@/styles/fresh'
import { Modal } from 'react-native-paper'
import { View, Text, Linking } from 'react-native'
import { ButtonRed } from '@/components/Buttons'

const SOS = ({ visible, setState }: any) => {
  function handleDistressSignal() {
    console.log('calling safety officer...') // perma
    const safetyOfficerPhoneNumber = '93227015'
    Linking.openURL(`tel:${safetyOfficerPhoneNumber}`)
  }

  const SOSButton = ({ onPress, children }: any) => {
    return <ButtonRed onPress={onPress}>{children}</ButtonRed>
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
