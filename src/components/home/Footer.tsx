import { View, TouchableOpacity, Text } from 'react-native'
import colors from '@/styles/colors'
import { Ionicons } from '@expo/vector-icons'
import { Dispatch, SetStateAction, useState } from 'react'
import { globalStyles } from '../../styles/global'

const SettingsButton = ({
  setShowSettings,
}: {
  setShowSettings: Dispatch<SetStateAction<boolean>>
}) => {
  const [focus, setFocus] = useState(false)
  const style = focus
    ? [globalStyles.button.outline.footer, globalStyles.utils.focused]
    : [globalStyles.button.outline.footer]
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style}
      onPressIn={() => setFocus(true)}
      onPressOut={() => setFocus(false)}
      onPress={() => setShowSettings(true)}
    >
      <Ionicons name="settings-outline" size={20} color={colors.homeFg} />
      <Text style={globalStyles.text.settings}>Settings</Text>
    </TouchableOpacity>
  )
}

const Footer = ({
  setShowSettings,
}: {
  setShowSettings: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <View style={globalStyles.container.footer}>
      <SettingsButton setShowSettings={setShowSettings} />
    </View>
  )
}

export default Footer
