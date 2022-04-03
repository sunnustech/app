/* sunnus components */
import { TouchableOpacity, Text } from 'react-native'
import { DEV as styles } from '@/styles/fresh'
import { DebugButtonProps } from '@/types/index'

const DebugButton = ({
  onPress,
  color = '#9ca3af',
  children,
}: DebugButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

export default DebugButton
