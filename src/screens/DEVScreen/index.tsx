/*
 * Hey devs, to add your own debug function, simply create a new instance of
 * Button below and put your intended function to call inside the onPress
 * property.
 */

/* debug functions */
// import { MatchRequest } from '@/types/knockout'
import { generateStationQR } from '@/lib/SOAR/QRDictionary'
import { sendPasswordResetEmail } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { auth, functions } from '@/sunnus/firebase'
import { QR } from '@/classes/QR'
import { Text, View, ScrollView } from 'react-native'
import { SOARContext } from '@/contexts/SOARContext'
import { useContext } from 'react'
import { Button } from '@/components/Buttons'
import { globalStyles } from '../../styles/global'

/* use this space to hard-code test inputs to functions */

function sendEmail() {
  const school = 'e0725213@u.nus.edu'
  const personal = 'brew4k@gmail.com'
  const target = personal
  console.log(`sending email to ${target}`)
  console.log("current user's email: ", auth.currentUser?.email)
  sendPasswordResetEmail(auth, target)
    .then(() => console.debug('email sent!'))
    .catch((err) => {
      console.log('==========================================')
      console.log(err)
    })
    .finally(() => {
      console.log('==========================================')
    })
}

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

/* add button that links to debug function */
const DebugList = (props: any) => {
  const { teamState } = useContext(SOARContext)
  return (
    <>
      <Text>Database</Text>

      <Text>QR Command List</Text>

      <Button onPress={generateStationQR} color="pink">
        Generate QR (to send to SOAR)
      </Button>

      <Text>Send QR to firebase endpoint</Text>

      <Button onPress={() => sendEmail()} color="orange">
        send PR email
      </Button>

      <Button onPress={() => firebaseQR('startTimer')} color="pink">
        QR: start
      </Button>

      <Button onPress={() => firebaseQR('resumeTimer')} color="pink">
        QR: resume
      </Button>

      <Button onPress={() => firebaseQR('pauseTimer')} color="pink">
        QR: pause
      </Button>

      <Button onPress={() => firebaseQR('stopTimer')} color="pink">
        QR: stop
      </Button>

      <Button onPress={() => firebaseQR('resetTeam')} color="pink">
        QR: reset
      </Button>

      <Button
        onPress={() => firebaseQR('completeStage', 'Slide')}
        color="emerald"
      >
        CS: Slide
      </Button>
      <Button
        onPress={() => firebaseQR('completeStage', 'Sotong Houze')}
        color="emerald"
      >
        CS: Sotong Houze
      </Button>
      <Button
        onPress={() => firebaseQR('completeStage', 'Nerf Battle')}
        color="emerald"
      >
        CS: Nerf Battle
      </Button>
      <Button
        onPress={() => firebaseQR('completeStage', 'Snake and Ladders')}
        color="emerald"
      >
        CS: Snake and Ladders
      </Button>
      <Button
        onPress={() => firebaseQR('completeStage', 'GOLF')}
        color="emerald"
      >
        CS: GOLF
      </Button>
      <Button
        onPress={() => firebaseQR('completeStage', 'Relay2Maze')}
        color="emerald"
      >
        CS: Relay2Maze
      </Button>
    </>
  )
}

/*
 * once you've imported the function and added a button, simply go to the
 * developer page on the app itself and press your newly created button to run
 * the function!
 */

const DEVScreen = () => {
  /* these three lines attaches a listener to participants/Dev_loper and
   * re-runs each time there is a change detect on server-side
   */
  // const firebaseListener = onSnapshot(
  //   doc(db, 'participants', 'Dev_loper'),
  //   (doc) => {
  //     console.debug('current data: ', doc.data())
  //   }
  // )

  // const navigation = useNavigation<AuthPage<'DEVScreen'>>()

  return (
    <View style={globalStyles.container.base}>
      <ScrollView
        contentContainerStyle={globalStyles.container.scrollBase}
        showsVerticalScrollIndicator={false}
      >
        <Text>Welcome to the DEV page!</Text>
        <Text>(you can navigate back by swiping in from the left)</Text>
        <View style={{ width: '60%', marginTop: 32 }}>
          <DebugList />
        </View>
      </ScrollView>
    </View>
  )
}
export default DEVScreen
