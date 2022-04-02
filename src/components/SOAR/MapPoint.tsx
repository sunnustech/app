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
  status,
}: any) => {
  return (
    <Marker coordinate={coordinate} opacity={status === '' ? 0 : 1}>
      <HandleIcon children={children} pointType={pointType} status={status} />
      <HandlePopup
        navigation={navigation}
        status={status}
        navTarget={navTarget}
        content={content}
      />
    </Marker>
  )
}

const HandlePopup = ({ navigation, navTarget, content, status }: any) => {
  if (status === 'next') {
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

const HandleIcon = ({ children, pointType, status }: any) => {
  if (pointType === 'game') {
    if (status === 'done') {
      return <MCI name="marker-check" color="#10b981" size={24} />
    }
    if (status === 'next') {
      return (
        <GemContainer>
          <Gem />
        </GemContainer>
      )
    }
    if (status === '') {
      return <MCI name="marker-check" color="#ff0000" size={1} />
    }
  }
  if (pointType === 'water') {
    return <MCI name="cup-water" color="#60A5FA" size={24} />
  }
  return null
}

export default MapPoint
