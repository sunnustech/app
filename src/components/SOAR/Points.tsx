import { Text, View } from 'react-native'
import colors from '@/styles/colors'
import { Team } from '@/classes/team'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '@/styles/global';

type PointsProps = {
  team: Team
}

const Points = (props: PointsProps) => {
  return (
    <View style={globalStyles.container.pointsArea}>
      <View style={globalStyles.container.points}>
        <MaterialCommunityIcons name="arch" size={14} color={colors.sky[500]}/>
        <Text style={globalStyles.text.points}>{props.team._points}</Text>
      </View>
    </View>
  )
}

export default Points
