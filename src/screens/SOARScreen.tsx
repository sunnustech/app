import { useContext, useRef, useState } from 'react'
import MapView from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Text } from 'react-native'
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { SOARContext } from '@/contexts/SOARContext'
import { map as styles } from '@/styles/fresh'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import UI from '@/components/SOAR/UI'
import { NUSCoordinates } from '@/data/constants'
import TimerComponent from '@/components/Timer'
import QRModal from '@/components/SOAR/QRModal'

const SOARScreen = () => {
  /* read data from SOAR context */
  const { QRState, } = useContext(SOARContext)


  // unpack states
  const [qr, setQr] = QRState

  // local states
  const [everythingLoaded, setEverythingLoaded] = useState(false)

  // Timer stuff
  const [isRunning, setIsRunning] = useState(false)
  const [pausedAt, setPausedAt] = useState(0)
  const [timerEvents, setTimerEvents] = useState<Array<number>>([])

  const mapRef = useRef<MapView | null>(null)
  const navigation = useNavigation<AuthPage<'SOARNavigator'>>()

  const flyToNUS = () => {
    if (mapRef.current) {
      mapRef.current.animateCamera(NUSCoordinates, { duration: 500 })
    }
  }

  const Timer = () => {
    if (!everythingLoaded) {
      return null
    }
    return (
      <TimerComponent
        SOARTimerEvents={timerEvents}
        pausedAt={pausedAt}
        isRunning={isRunning}
      />
    )
  }

  const props = {
    UI: {
      navigation,
      flyToNUS,
      Timer,
    },
  }

  return (
    <RootSiblingParent>
      <NoTouchDiv style={styles.container}>
        <Map mapRef={mapRef} />
        <UI {...props.UI} />
        <QRModal qr={qr} setQr={setQr} />
      </NoTouchDiv>
    </RootSiblingParent>
  )
}

export default SOARScreen
