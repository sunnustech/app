import { setDoc, doc as fsdoc, updateDoc } from '@firebase/firestore'
import { db } from '@/sunnus/firebase'

type FirestoreRequest = {
  collection: string
  docs: {
    [key: string]: {
      [key: string]: any
    }
  }
  data: Record<string, any>
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

const update = async ({ collection, doc, data, merge = true }: FirestoreRequest) => {
  const initRef = fsdoc(db, collection, '.init')
  const docRef = fsdoc(db, collection, doc)

  /* create the collection if doesn't exist yet, and push the date */
  await setDoc(initRef, {
    date: new Date().toString(),
  })

  await updateDoc(docRef, data)
}

export default update
