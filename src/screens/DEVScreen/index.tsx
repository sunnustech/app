/*
 * Hey devs, to add your own debug function, simply create a new instance of
 * DebugButton below and put your intended function to call inside the onPress
 * property.
 */

/* debug functions */
// import { MatchRequest } from '@/types/knockout'
import { generateStationQR } from '@/lib/SOAR/QRDictionary'
import colors from '@/styles/colors'
import { sendPasswordResetEmail } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { auth, functions } from '@/sunnus/firebase'
import { QR } from '../../classes/QR'
import { Text, View, ScrollView } from 'react-native'
import { DEV as styles } from '@/styles/fresh'
import DebugButton from './DebugButton'

/* use this space to hard-code test inputs to functions */

function sendEmail() {
  const school = 'e0725213@u.nus.edu'
  const personal = 'brew4k@gmail.com'
  sendPasswordResetEmail(auth, personal).then(() =>
    console.debug('email sent!')
  )
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
const DebugList = () => (
  <>
    <Text>Database</Text>

    <Text>QR Command List</Text>

    <DebugButton onPress={generateStationQR} color={colors.pink[500]}>
      Generate QR (to send to SOAR)
    </DebugButton>

    <Text>Send QR to firebase endpoint</Text>

    <DebugButton
      onPress={() => firebaseQR('startTimer')}
      color={colors.pink[500]}
    >
      QR: start
    </DebugButton>

    <DebugButton
      onPress={() => firebaseQR('resumeTimer')}
      color={colors.pink[500]}
    >
      QR: resume
    </DebugButton>

    <DebugButton
      onPress={() => firebaseQR('pauseTimer')}
      color={colors.pink[500]}
    >
      QR: pause
    </DebugButton>

    <DebugButton
      onPress={() => firebaseQR('stopTimer')}
      color={colors.pink[500]}
    >
      QR: stop
    </DebugButton>

    <DebugButton
      onPress={() => firebaseQR('resetTeam')}
      color={colors.pink[500]}
    >
      QR: reset
    </DebugButton>

    <DebugButton
      onPress={() => firebaseQR('completeStage', 'Slide')}
      color={colors.emerald[500]}
    >
      {' '}
      CS: Slide{' '}
    </DebugButton>
    <DebugButton
      onPress={() => firebaseQR('completeStage', 'Sotong Houze')}
      color={colors.emerald[500]}
    >
      {' '}
      CS: Sotong Houze{' '}
    </DebugButton>
    <DebugButton
      onPress={() => firebaseQR('completeStage', 'Nerf Battle')}
      color={colors.emerald[500]}
    >
      {' '}
      CS: Nerf Battle{' '}
    </DebugButton>
    <DebugButton
      onPress={() => firebaseQR('completeStage', 'Snake and Ladders')}
      color={colors.emerald[500]}
    >
      {' '}
      CS: Snake and Ladders{' '}
    </DebugButton>
    <DebugButton
      onPress={() => firebaseQR('completeStage', 'GOLF')}
      color={colors.emerald[500]}
    >
      {' '}
      CS: GOLF{' '}
    </DebugButton>
    <DebugButton
      onPress={() => firebaseQR('completeStage', 'Relay2Maze')}
      color={colors.emerald[500]}
    >
      {' '}
      CS: Relay2Maze{' '}
    </DebugButton>
  </>
)

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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
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
