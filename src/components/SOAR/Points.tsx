import { Text, View } from 'react-native'
import colors from '@/styles/colors'
import { Team } from '@/classes/team'
import { map as styles } from '@/styles/fresh'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type PointsProps = {
  team: Team
}

const Points = (props: PointsProps) => {
  return (
    <View style={styles.pointsContainer}>
      <View style={styles.pointsTextContainer}>
        <MaterialCommunityIcons name="arch" size={14} color={colors.sky[500]}/>
        <Text style={styles.pointsText}>{props.team._points}</Text>
      </View>
    </View>
  )
}

export default Points
