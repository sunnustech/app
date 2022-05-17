import { useRef } from 'react'
import MapView from 'react-native-maps'
import { RootSiblingParent } from 'react-native-root-siblings'
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'
import { NoTouchDiv } from '@/components/Views'
import { Map } from '@/components/SOAR'
import UI from '@/components/SOAR/UI'
import { NUSCoordinates } from '@/data/constants'
import QRModal from '@/components/SOAR/QRModal'
import { db } from '@/sunnus/firebase'
import { Unsubscribe } from 'firebase/auth'
import { onSnapshot, doc } from 'firebase/firestore'
import { useCallback, useContext } from 'react'
import { SOARContext } from '@/contexts/SOARContext'
import { converter } from '@/classes/firebase'
import { useFocusEffect } from '@react-navigation/native'
import { QR } from '@/classes/QR'
import { globalStyles } from '@/styles/global'
import EndCard from '@/components/SOAR/EndCard'

const SOARScreen = () => {
  const mapRef = useRef<MapView | null>(null)
  const navigation = useNavigation<AuthPage<'SOARNavigator'>>()

  const flyToNUS = () => {
    if (mapRef.current) {
      mapRef.current.animateCamera(NUSCoordinates, { duration: 500 })
    }
  }

  const { QRState, teamState } = useContext(SOARContext)

  // context stuff
  const setQr = QRState[1]
  const setTeam = teamState[1]

  useFocusEffect(
    useCallback(() => {
      console.debug('focused on SOAR navigator')
      const unsubscribeFirebase: Unsubscribe = onSnapshot(
        doc(db, 'teams', 'developer_team').withConverter(converter.team),
        (doc) => {
          const team = doc.data()
          if (team !== undefined) {
            console.debug('received firebase updates at', new Date())
            setTeam(team)
            console.debug(`\n<${team.teamName}>`)
            console.debug(`${team._points} points,`)
            console.debug(
              `${team._stationsRemaining.length} stations remaining\n`
            )
            console.debug(
              `${team._stationsRemaining}\n`
            )
            console.debug(
              `next up: ${team.nextStation()}\n`
            )
          }
        }
      )
      return () => {
        setQr(QR.empty)
        console.debug('unfocused SOAR navigator')
        /* detach firebase listener on unmount */
        unsubscribeFirebase()
        console.debug('detach firebase listener on SOAR navigator')
      }
    }, [])
  )
  return (
    <RootSiblingParent>
      <NoTouchDiv style={globalStyles.container.base}>
        <Map mapRef={mapRef} />
        <UI navigation={navigation} flyToNUS={flyToNUS} />
        <QRModal />
      </NoTouchDiv>
    </RootSiblingParent>
  )
}

export default SOARScreen
