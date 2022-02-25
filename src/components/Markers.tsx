import { Marker, Callout } from 'react-native-maps'
import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'
import { StyleSheet, View, Text } from 'react-native'
import { RootDrawerParamList } from '@/lib/navigation'

type NavType = NSNP<RootDrawerParamList, 'Map'>
type MarkerType = {
  navigation: NavType
  coordinate: {
    latitude: number
    longitude: number
  }
  description: string
  children: any // ideally the icon of the marker
}

// sentosa:
// latitude: 1.258,
// longitude: 103.82,

const CustomMarker = ({
  navigation,
  coordinate,
  description,
  children,
}: MarkerType) => {
  const targetScreen = 'DummyTest'
  return (
    <Marker coordinate={coordinate}>
      {children}
      <Callout
        style={styles.callout}
        onPress={() => navigation.push(targetScreen)}
      >
        <View>
          <Text>{description}</Text>
        </View>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  callout: {
    width: 200,
    height: 200,
  },
})

export { CustomMarker }
