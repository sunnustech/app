/* firebase */
import {
  getDocs,
  getDoc,
  collection as fscol,
  doc as fsdoc,
} from '@firebase/firestore'

/* sunnus components */
import { db } from '@/sunnus/firebase'

type CollectionRequest = {
  collection: string
}

type DocumentRequest = CollectionRequest & {
  doc: string
}

const pullCollection = async ({ collection }: CollectionRequest) => {
  const response = await getDocs(fscol(db, collection))
  const packet: { [doc: string]: any } = {}
  response.forEach((doc) => (packet[doc.id] = doc.data()))
  return packet
}

const pullDoc = async ({ collection, doc }: DocumentRequest) => {
  var result: { status: string; data: any } = {
    status: 'error',
    data: {},
  }
  await getDoc(fsdoc(db, collection, doc))
    .then((doc) => {
      /*
       * doc is an object, so to get the data itself,
       * you still need to call its data() method.
       * it will return a pure JS object of data.
       */
      const firebaseData = doc.data()
      if (firebaseData) {
        result = { status: 'ok', data: firebaseData }
      } else {
        console.warn(`There is no data in the ${doc} document.`)
        return { status: 'error: no data' }
      }
    })
    .catch((err) => {
      console.warn('error fetching admin locations data from Firestore', err) // perma
      return { status: 'error: firebase error' }
    })
  return result
}

export { pullCollection, pullDoc }
