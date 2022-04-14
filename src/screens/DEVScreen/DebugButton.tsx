/* sunnus components */
import { Text, TouchableOpacity } from 'react-native'
import { DEV as styles } from '@/styles/fresh'
import { DebugButtonProps } from '@/types/index'
import colors from '@/styles/colors'

const DebugButton = ({
  onPress,
  color = colors.gray[400],
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
