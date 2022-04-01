import { Marker, Callout } from 'react-native-maps'
import { StyleSheet, View, Text } from 'react-native'
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons'
import Popup from './Popup'
import Gem from './Gem'
import { map as styles } from '@/styles/fresh'

const MapPoint = ({
  navigation,
  coordinate,
  children,
  navTarget,
  content,
  pointType,
}: any) => {
  return (
    <Marker coordinate={coordinate}>
      <HandleIcon children={children} pointType={pointType} />
      <HandlePopup
        navigation={navigation}
        pointType={pointType}
        navTarget={navTarget}
        content={content}
      />
    </Marker>
  )
}

const HandlePopup = ({ navigation, navTarget, content, pointType }: any) => {
  if (pointType === 'game') {
    return (
      <Callout
        style={styles.callout}
        onPress={() => navigation.navigate(navTarget)}
      >
        <Popup content={content} />
      </Callout>
    )
  }
  return null
}

const GemContainer = ({ children }: any) => {
  return (
    <View style={styles.debug}>
      <View style={styles.GemContainer}>{children}</View>
    </View>
  )
}

const HandleIcon = ({ children, pointType }: any) => {
  if (pointType === 'game') {
    return (
      <GemContainer>
        <Gem />
      </GemContainer>
    )
  }
  if (pointType === 'water') {
    return <MCI name="cup-water" color="#60A5FA" size={24} />
  }
  return null
}

export default MapPoint
