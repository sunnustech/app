/* firebase */
import { setDoc, doc, writeBatch } from '@firebase/firestore'

/* sunnus components */
import { db } from '@/sunnus/firebase'

type FirestoreRequest = {
  collection: string
  data: {
    [key: string]: any
  }
}

const push = async ({ collection, data }: FirestoreRequest) => {
  /* create the collection if doesn't yet exist, and push the date */
  await setDoc(doc(db, collection, '.init'), {
    date: new Date().toString(),
  })

  /* open a write ticket (a batch, a queue of operations) */
  const batch = writeBatch(db)

  /* each key in the data object gets mapped to a Firestore document. */
  Object.keys(data).forEach((key: string) => {
    console.log('key', key)
    /* add to queue with .set */
    batch.set(doc(db, collection, key), data[key])
  })

  /* execute all writes in the queue with .commit */
  try {
    await batch.commit()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export default push
