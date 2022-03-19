/* firebase */
import {
  collection,
  addDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  doc,
  setDoc,
} from '@firebase/firestore'

/* sunnus components */
import { db } from '@/sunnus/firebase'
import writeSchema from '@/data/writeSchema'
import DebugButton from './DebugButton'

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
}

/*
 * Hey devs, to add your own debug function, simply create a new instance of
 * DebugButton below and put your intended function to call inside the onPress
 * property.
 */
const Buttons = () => (
  <>
    <DebugButton onPress={writeSchema} color="#22c55e">
      Write Schema
    </DebugButton>
  </>
)

export default Buttons
