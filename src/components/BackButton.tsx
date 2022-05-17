import { View, TouchableOpacity, Text } from 'react-native'
import { globalStyles } from '@/styles/global'
import { AuthPageNavigator } from '@/types/navigation'
import { Ionicons } from '@expo/vector-icons'

const BackButton = ({
  text,
  navigation,
}: {
  text: string
  navigation: AuthPageNavigator
}) => {
  const Chevron = () => (
    <TouchableOpacity
      style={globalStyles.button.outline.back}
      onPress={() => navigation.pop()}
    >
      <Ionicons
        name="chevron-back"
        size={32}
        color={globalStyles.button.outline.back.color}
      />
    </TouchableOpacity>
  )
  return (
    <View style={globalStyles.container.backButton}>
      <Chevron />
      <Text style={globalStyles.text.back}>{text}</Text>
    </View>
  )
}

export default BackButton
