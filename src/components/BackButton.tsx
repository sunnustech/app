import { View, TouchableOpacity, Text } from 'react-native'
import colors from '@/styles/colors'
import { back as styles } from '@/styles/fresh'
import { AuthPageNavigator } from '@/types/navigation'
import { Ionicons } from '@expo/vector-icons'

const BackButton = ({
  text,
  navigation,
}: {
  text: string
  navigation: AuthPageNavigator
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.pop()}
        >
          <Ionicons name="ios-chevron-back" size={32} color={colors.homeFg} />
        </TouchableOpacity>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  )
}

export default BackButton
