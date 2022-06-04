import { View } from 'react-native'
import { Modal } from 'react-native-paper'
import { AuthenticatedPages, AuthPage } from '@/types/navigation'
import { UseState } from '@/types/SOAR'
import { auth } from '@/sunnus/firebase'
import { Auth } from 'firebase/auth'
import { AccentButton, Button } from '@/components/Buttons'
import { globalStyles } from '@/styles/global'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

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
  const { userState } = useContext(UserContext)
  const user = userState[0]
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
        {(user.role === 'soar-admin' || user.role === 'admin') && (
          <AccentButton
            color="pink"
            onPress={() => go('GeneratorScreen')}
            children="Generate QR"
          />
        )}
        {user.role === 'admin' && (
          <AccentButton
            color="purple"
            onPress={() => go('DEVScreen')}
            children="Development"
          />
        )}
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
