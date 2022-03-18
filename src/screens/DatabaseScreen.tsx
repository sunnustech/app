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

/* sunnus components */
import { auth, db } from '@/sunnus/firebase'
import { Button, ButtonGreen } from '@/components/Buttons'
import styles from '@/styles/main'
import { notificationInit, sendPushNotification } from '@/lib/notifications'
import writeSchema from '@/data/writeSchema'

namespace firestore {
  /* example database read function */
  export const read = async () => {
    const querySnapshot = await getDocs(collection(db, 'examples'))
    querySnapshot.forEach((doc) => {
      console.log(doc.data().expoPushTokens)
    })
  }
  /* example database write function (to a specific collection) */
  export const writeCollection = async () => {
    try {
      const docRef = await addDoc(collection(db, 'examples'), {
        expoPushTokens: ['OcXy78Pyf8Ryjwa9mnKZqe'],
      })

      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  /* example database write function (to a specific document) */
  export const writeDocument = async () => {
    try {
      await setDoc(doc(db, 'examples', 'expo'), {
        pushTokens: ['OcXy78Pyf8Ryjwa9mnKZqe'],
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  /*
   * pushes your expo token to firestore
   */
  export const pushMyExpoToken = async (expoPushToken: string) => {
    console.log('uploading my expo token', expoPushToken)
    try {
      await updateDoc(doc(db, 'test', 'expo'), {
        pushTokens: arrayUnion(expoPushToken),
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  /*
   * reads the list of expo tokens on firestore and sends a notification
   * to all associated users
   */
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

const Buttons = () => {
  return (
    <>
      <ButtonGreen onPress={() => writeSchema()}>Write Schema</ButtonGreen>
      <Button onPress={() => firestore.writeCollection()}>
        Write Collection
      </Button>
      <Button onPress={() => firestore.read()}>Read</Button>
      <Button onPress={() => firestore.writeDocument()}>Write Document</Button>
      <Button onPress={() => firestore.notifyAll()}>
        Send Notification to all Expo Users
      </Button>
    </>
  )
}

const DatabaseScreen = () => {
  const expoPushToken = notificationInit().expoPushToken
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
        <ButtonGreen onPress={() => writeSchema()}>Write Schema</ButtonGreen>
        <Button onPress={() => firestore.writeCollection()}>
          Write Collection
        </Button>
        <Button onPress={() => firestore.read()}>Read</Button>
        <Button onPress={() => firestore.writeDocument()}>
          Write Document
        </Button>
        <Button onPress={() => firestore.pushMyExpoToken(expoPushToken)}>
          Push My Expo Token
        </Button>
        <Button onPress={() => firestore.notifyAll()}>
          Send Notification to all Expo Users
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default DatabaseScreen
export { Buttons }
