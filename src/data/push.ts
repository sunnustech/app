import { setDoc, doc as fsdoc, writeBatch } from '@firebase/firestore'
import { db } from '@/sunnus/firebase'

type FirestoreRequest = {
  collection: string
  docs: {
    [key: string]: {
      [key: string]: any
    }
  }
  // merge: true  => update parts that changed only
  // merge: false => overwrite database entirely
  // default is true
  merge?: boolean
}

/*
 * example FirestoreRequest:
 * ----------------------------------------
 * const foo = {
 *   collection: 'TSS',
 *   docs: {
 *     'dodgeball': {
 *       'finals': [...],
 *       'semifinals': [...],
 *     }
 *   },
 *   merge: true
 * }
 * ----------------------------------------
 * To be Firestore-friendly:
 *   1. `docs` has to be an Object.
 *   2. `dodgeball`-level keys must be strings
 *   3. `finals`-level keys must be strings
 *   4. any data below `finals` can be of any type
 */

const push = async ({ collection, docs, merge = true }: FirestoreRequest) => {
  /* create the collection if doesn't exist yet, and push the date */
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
  } catch (err) {
    console.error('Error adding document: ', err)
  }
}

export default push
