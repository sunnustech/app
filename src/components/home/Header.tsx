import { View, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { Ionicons } from '@expo/vector-icons'
import Sunnus from '@/components/svgs/Sunnus'
import { Overlap } from '@/components/Views'
import { home as styles } from '@/styles/fresh'
import { Dispatch, SetStateAction } from 'react'

const Header = ({
  setShowSettings,
}: {
  setShowSettings: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <View style={styles.headingContainer}>
      <Overlap>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Sunnus fill={colors.gray[800]} />
          </View>
        </View>
      </Overlap>
      <Overlap>
        <View style={styles.iconsContainer}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Overlap>
    </View>
  )
}

export default Header
