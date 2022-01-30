/* firebase */
import { setDoc, addDoc, doc, writeBatch } from '@firebase/firestore'

/* sunnus components */
import { db } from '@/sunnus/firebase'

/* expected data for each team:
 * 1. the group title
 * 2. the group's id (randomly generated alphanumeric sequence)
 *      recommended length: 6 characters. keep in mind the participants
 *      will have to key this in when they login
 * 3. each member's:
 *      - email address
 *      - handphone number
 */
const participants = [
  // {{{
  {
    group_title: 'Known Painters',
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
    group_title: 'Modest Liberators',
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
] // }}}

/* expected data:
 * 1. the who v. who, venue, time for the first 32 teams
 * 2. the venue, time for all the matches up to the finals
 */
const TSS = {
  // {{{
  first_32: [
    { A: 'Independent Decorators', B: 'Gentle Sweaters' },
    { A: 'Known Painters', B: 'Modest Liberators' },
  ],
  schedule: [
    {
      title: 'Dodgeball Semi-finals',
      time: '15:00',
      venue: 'Court 3',
    },
    {
      title: 'Prize Presentation',
      time: '16:00',
      venue: 'Stage',
    },
  ],
} // }}}

/* expected data: the entire rotation matrix.
 * for each location, we require:
 * 1. The name of the location.
 * 2. The title of the game.
 * 3. Whether or not the game is physical or virtual.
 * 4. Game instructions/introduction statement.
 * 5. Google map pin url.
 * 6. Timetable.
 *      for each entry on each location's timetable, we require:
 *        1. time
 *        2. exact group title of who's supposed to be that at said time
 */
const SOAR = [
  // {{{
  {
    location: 'The Lair of the Green-eyed Man',
    game_title: 'YeetBall',
    phyiscal: true,
    details: 'game instructions/intro statement (try to keep it concise!)',
    google_map_pin_url: 'https://goo.gl/maps/1Zrg21yeCGQJGhK18',
    timetable: [
      {
        time: '15:00',
        group_title: 'Known Painters',
      },
      {
        time: '15:30',
        group_title: 'Modest Liberators',
      },
    ],
  },
] // }}}

const writeParticipants = async () => {
  const collection = '_participants'
  /* create the collection if doesn't yet exist, and push the date */
  await setDoc(doc(db, collection, '.init'), {
    date: new Date().toString(),
  })

  /* open a write ticket (a batch) */
  const batch = writeBatch(db)

  /* add to-add stuff to the write batch using .set */
  participants.forEach((team) => {
    batch.set(doc(db, collection, team.id), team)
  })

  /* execute the write with .commit */
  try {
    await batch.commit()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const writeTSS = async () => {
  const collection = '_TSS'
  /* create the collection if doesn't yet exist, and push the date */
  await setDoc(doc(db, collection, '.init'), {
    date: new Date().toString(),
  })

  /* open a write ticket (a batch) */
  const batch = writeBatch(db)

  /* add to-add stuff to the write batch using .set */
  batch.set(doc(db, collection, 'first_32'), { schedule: TSS.first_32 })
  batch.set(doc(db, collection, 'schedule'), { schedule: TSS.schedule })

  /* execute the write with .commit */
  try {
    await batch.commit()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const writeSOAR = async () => {
  const collection = '_SOAR'
  /* create the collection if doesn't yet exist, and push the date */
  await setDoc(doc(db, collection, '.init'), {
    date: new Date().toString(),
  })

  /* open a write ticket (a batch) */
  const batch = writeBatch(db)

  /* add to-add stuff to the write batch using .set */
  SOAR.forEach((place) => {
    batch.set(doc(db, collection, place.game_title), { place })
  })

  /* execute the write with .commit */
  try {
    await batch.commit()
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const writeSchema = async () => {
  await writeParticipants()
  await writeTSS()
  await writeSOAR()
}

export default writeSchema
