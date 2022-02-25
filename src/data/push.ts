/* firebase */
import { setDoc, doc as fsdoc, writeBatch } from '@firebase/firestore'

/* sunnus components */
import { db } from '@/sunnus/firebase'

type FirestoreRequest = {
  collection: string
  docs: {
    [doc: string]: any
  }
  merge?: boolean
}

const push = async ({ collection, docs, merge = true }: FirestoreRequest) => {
  /* create the collection if doesn't yet exist, and push the date */
  await setDoc(fsdoc(db, collection, '.init'), {
    date: new Date().toString(),
  })

  /* open a write ticket (a batch, a queue of operations) */
  const batch = writeBatch(db)

  /* each key in the data object gets mapped to a Firestore document. */
  Object.keys(docs).forEach((doc: string) => {
    /* add to queue with .set */
    batch.set(fsdoc(db, collection, doc), docs[doc], { merge })
  })

  /* execute all writes in the queue with .commit */
  try {
    await batch.commit()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export default push
