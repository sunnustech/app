import { Text, View, TouchableOpacity } from 'react-native'
import { Modal } from 'react-native-paper'
import { AuthenticatedPages, AuthPage } from '@/types/navigation'
import { UseState } from '@/types/SOAR'
import { home as styles } from '@/styles/fresh'
import { auth } from '@/sunnus/firebase'
import { Auth } from 'firebase/auth'
import { Button } from '@/components/Buttons'
import { globalStyles } from '@/styles/global'

const DevButton = ({ onPress, children, containerStyle, textStyle }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyles.button.pill.base, containerStyle]}
    >
      <Text style={[globalStyles.text.pillButton, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const Settings = ({
  showSettingsState,
  navigation,
  logoutHandler,
}: {
  showSettingsState: UseState<boolean>
  navigation: AuthPage<'HomeScreen'>
  logoutHandler: (auth: Auth) => void
}) => {
  const [showSettings, setShowSettings] = showSettingsState
  function go(target: keyof AuthenticatedPages) {
    navigation.navigate(target)
    setShowSettings(false)
  }
  return (
    <Modal
      visible={showSettings}
      dismissable={true}
      onDismiss={() => setShowSettings(false)}
    >
      <View style={globalStyles.container.modal}>
        <DevButton
          onPress={() => go('GeneratorScreen')}
          textStyle={styles.GenerateQRbuttonText}
          containerStyle={styles.GenerateQRbutton}
        >
          Generate QR
        </DevButton>
        <DevButton
          onPress={() => go('DEVScreen')}
          textStyle={styles.DEVbuttonText}
          containerStyle={styles.DEVbutton}
        >
          Development
        </DevButton>
        <View style={{ height: 24 }} />
        <Button color='red' onPress={() => logoutHandler(auth)} children="Logout" />
      </View>
    </Modal>
  )
}

export default Settings
