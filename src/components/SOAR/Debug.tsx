import { httpsCallable } from 'firebase/functions'
import { functions } from '@/sunnus/firebase'
import { QR } from '@/classes/QR'
import { MapSOSButton } from '@/components/SOAR'

const Debug = () => {
  function firebaseQR(command: string, station?: string) {
    console.log('firebasing the QR code...')
    const props = {
      command,
      points: 0,
      facilitator: 'Khang',
      station: station || 'Slide',
      teamName: 'developer_team',
    }
    const qr = new QR(props)
    const QRApi = httpsCallable(functions, 'QRApi')
    QRApi(props).then((result) => {
      const data: any = result.data
      console.log('firebase status', data.status)
    })
    console.log('test QR:', qr)
  }

  return (
    <>
      <MapSOSButton onPress={() => firebaseQR('startTimer')} />
      <MapSOSButton onPress={() => firebaseQR('resumeTimer')} />
      <MapSOSButton onPress={() => firebaseQR('pauseTimer')} />
      <MapSOSButton onPress={() => firebaseQR('stopTimer')} />
      <MapSOSButton onPress={() => firebaseQR('resetTeam')} />
    </>
  )
}

export default Debug
