import { useRef } from 'react'
import MapView from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { map as styles } from '@/styles/fresh'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import UI from '@/components/SOAR/UI'
import { NUSCoordinates } from '@/data/constants'
import QRModal from '@/components/SOAR/QRModal'

const SOARScreen = () => {
  const mapRef = useRef<MapView | null>(null)
  const navigation = useNavigation<AuthPage<'SOARNavigator'>>()

  const flyToNUS = () => {
    if (mapRef.current) {
      mapRef.current.animateCamera(NUSCoordinates, { duration: 500 })
    }
  }

  return (
    <RootSiblingParent>
      <NoTouchDiv style={styles.container}>
        <Map mapRef={mapRef} />
        <UI navigation={navigation} flyToNUS={flyToNUS} />
        <QRModal />
      </NoTouchDiv>
    </RootSiblingParent>
  )
}

export default SOARScreen
