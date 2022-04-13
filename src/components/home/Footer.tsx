import { View, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native'
import colors from '@/styles/colors'
import { home as styles } from '@/styles/fresh'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

const SettingsButton = () => {
  const [focus, setFocus] = useState(false)
  const style = focus
    ? [styles.footerSettingsButton, styles.focusedButton]
    : [styles.footerSettingsButton]
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style}
      onPressIn={() => setFocus(true)}
      onPressOut={() => setFocus(false)}
    >
      <Ionicons name="settings-outline" size={20} color={colors.gray[800]} />
      <Text style={styles.footerSettingsText}>Settings</Text>
    </TouchableOpacity>
  )
}

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <SettingsButton />
    </View>
  )
}

export default Footer
