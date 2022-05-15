import { View } from 'react-native'
import { Modal } from 'react-native-paper'
import { AuthenticatedPages, AuthPage } from '@/types/navigation'
import { UseState } from '@/types/SOAR'
import { auth } from '@/sunnus/firebase'
import { Auth } from 'firebase/auth'
import { AccentButton, Button } from '@/components/Buttons'
import { globalStyles } from '@/styles/global'

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
        <AccentButton
          color="pink"
          onPress={() => go('GeneratorScreen')}
          children="Generate QR"
        />
        <AccentButton
          color="purple"
          onPress={() => go('DEVScreen')}
          children="Development"
        />
        <View style={{ height: 24 }} />
        <Button
          color="red"
          onPress={() => logoutHandler(auth)}
          children="Logout"
        />
      </View>
    </Modal>
  )
}

export default Settings
