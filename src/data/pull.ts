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
  const response = await getDoc(fsdoc(db, collection, doc))
  return response.data()
}

export { pullCollection, pullDoc }
