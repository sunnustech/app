import { KeyboardAvoidingView, Text, View } from 'react-native'

/* firebase */
import {
  collection,
  addDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  getDoc,
  doc,
  setDoc,
} from '@firebase/firestore'

/* navigation */
// import { RootStackParamList } from '../../App'
// import { useNavigation } from '@react-navigation/native'
// import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth, db } from '@/sunnus/firebase'
import { Button } from '@/components/Buttons'
import styles from '@/styles/main'
import { notificationInit, sendPushNotification } from '@/lib/notifications'

namespace fb {
  export const read = async () => {
    const querySnapshot = await getDocs(collection(db, 'test'))
    querySnapshot.forEach((doc) => {
      console.log(doc.data().lord)
    })
  }
  export const writeCollection = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        expoPushTokens: ['OcXy78Pyf8Ryjwa9mnKZqe'],
      })

      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  const schema = {
    something: 'is up',
  }

  export const writeSchema = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test-schema'), schema)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  export const writeDocument = async () => {
    try {
      const docRef = await setDoc(doc(db, 'test', 'expo'), {
        pushTokens: ['OcXy78Pyf8Ryjwa9mnKZqe'],
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  export const pushMyExpoToken = async (expoPushToken: string) => {
    try {
      await updateDoc(doc(db, 'test', 'expo'), {
        pushTokens: arrayUnion(expoPushToken),
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  export const notifyAll = async () => {
    const docRef = doc(db, 'test', 'expo')
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
    // console.log('Document data:', docSnap.data())
    const data = docSnap.data()
    const expoPushTokens = data?.pushTokens
    await sendPushNotification(expoPushTokens)
    console.log(expoPushTokens)
  }
}

const DatabaseScreen = () => {
  const expoPushToken = notificationInit().expoPushToken
  // const navigation = useNavigation<NSNP<RootStackParamList, 'Database'>>()
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>
        You are logged in as{' '}
        {auth.currentUser ? auth.currentUser.email : 'ERROR'}!
      </Text>
      <Text>This page will be used to test firebase:firestore read/writes</Text>
      <Text>
        the plan is to store a bunch of expo push notification tokens on
        firebase
      </Text>
      <View style={styles.buttonContainer}>
        {/* <Button onPress={() => fb.read()}>Read</Button> */}
        {/* <Button onPress={() => fb.writeCollection()}>Write Collection</Button> */}
        {/* <Button onPress={() => fb.writeDocument()}>Write Document</Button> */}
        <Button onPress={() => fb.writeSchema()}>Write Schema</Button>
        <Button onPress={() => fb.pushMyExpoToken(expoPushToken)}>
          Push My Expo Token
        </Button>
        <Button onPress={() => fb.notifyAll()}>
          Send Notification to all Expo Users
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default DatabaseScreen
