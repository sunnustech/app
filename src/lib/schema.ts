/* firebase */
import { setDoc, addDoc, doc, writeBatch } from '@firebase/firestore'

/* sunnus components */
import { db } from '@/sunnus/firebase'

const participants = [
  {
    group_title: 'Alpha Warriors',
    id: 'xifIuXK618jTpt1U5KoL',
    members: [
      {
        email: 'alice@gmail.com',
        phone: '77884793',
      },
      {
        email: 'brandon@gmail.com',
        phone: '79412799',
      },
      {
        email: 'carla@gmail.com',
        phone: '77008669',
      },
      {
        email: 'dave@gmail.com',
        phone: '70620715',
      },
    ],
  },
  {
    group_title: 'Charlie Tigers',
    id: '1l6tlj0vXEXWWytsWlHh',
    members: [
      {
        email: 'adam@gmail.com',
        phone: '73125593',
      },
      {
        email: 'beverly@gmail.com',
        phone: '75687708',
      },
      {
        email: 'cedric@gmail.com',
        phone: '75893845',
      },
      {
        email: 'dana@gmail.com',
        phone: '78449264',
      },
    ],
  },
]

const writeSchema = async () => {
  /* create the collection "_participants" it it doesn't yet exist, and push the date */
  await setDoc(doc(db, '_participants', '.init'), {
    date: new Date().toString(),
  })

  /* open a write ticket (a batch) */
  const batch = writeBatch(db)

  /* add to-add stuff to the write batch using .set */
  participants.forEach((team) => {
    batch.set(doc(db, '_participants', team.id), team)
  })

  /* execute the write with .commit */
  try {
    await batch.commit()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export { participants }
export default writeSchema
