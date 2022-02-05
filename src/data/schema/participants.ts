import { Group, ParticipantsData } from './participants.d'
import { objFromArray } from './utils'

const testOne: Group = {
  group_title: 'Known_Painters',
  id: 'xifIuXK618jTpt1U5KoL',
  registered_events: {
    TSS: {
      volleyball: true,
    },
  },
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
}

const testTwo: Group = {
  group_title: 'Modest_Liberators',
  id: '1l6tlj0vXEXWWytsWlHh',
  registered_events: {
    SOAR: true,
  },
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
}

const participants: ParticipantsData = objFromArray([testOne, testTwo], 'id')

export default participants
