import {
  Member,
  ParticipantsData,
  RegisteredEvents,
  TeamProps,
} from '@/types/participants'
import { SOARTeamData } from '@/types/SOAR'
import { objFromArray } from '@/lib/utils'
import { stationOrder } from './SOAR'

const SOARInit: SOARTeamData = {
  timerRunning: false,
  started: false,
  stopped: false,
  startTime: 0,
  stopTime: 0,
  allEvents: [],
  direction: 'A',
  points: 0,
}

function newSunNUSTeam(props: {
  members: Array<Member>
  registeredEvents: RegisteredEvents
  direction: 'A' | 'B'
  groupTitle: string
}) {
  return {
    SOAR: SOARInit,
    SOARStart: 0,
    SOARTimerEvents: [0],
    SOARPausedAt: 0,
    SOARStationsCompleted: [],

    groupTitle: props.groupTitle,
    SOARStationsRemaining: stationOrder[props.direction],
    members: props.members,
    registeredEvents: props.registeredEvents,
  }
}

const testOne = {
  groupTitle: 'Known_Painters',
  registeredEvents: {
    TSS: {
      volleyball: true,
      dodgeball: true,
    },
    SOAR: true,
  },
  SOAR: SOARInit,
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

const testTwo = {
  groupTitle: 'Modest_Liberators',
  registeredEvents: {
    TSS: {
      volleyball: true,
      frisbee: true,
    },
    SOAR: true,
  },
  SOAR: SOARInit,
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

const testThree = {
  groupTitle: 'HS123',
  registeredEvents: {
    TSS: {
      volleyball: true,
      dodgeball: true,
      frisbee: true,
    },
    SOAR: false,
  },
  SOAR: {
    timerRunning: false,
    started: false,
    stopped: false,
    startTime: {},
    stopTime: {},
    timerEvents: [],
  },
  members: [
    {
      email: 'hongsheng@gmail.com',
      phone: '11111111',
    },
    {
      email: 'ryan@gmail.com',
      phone: '22222222',
    },
    {
      email: 'khang@gmail.com',
      phone: '88888888',
    },
    {
      email: 'junhong@gmail.com',
      phone: '99999999',
    },
  ],
}

const Developer = newSunNUSTeam({
  groupTitle: 'Developer',
  direction: 'A',
  registeredEvents: {
    SOAR: true,
  },
  members: [
    {
      email: 'adam@gmail.com',
      phone: '73125593',
      loginId: 'dev_loper120389',
    },
    {
      email: 'beverly@gmail.com',
      phone: '75687708',
      loginId: 'dev_loper120388',
    },
    {
      email: 'calista@gmail.com',
      phone: '75893845',
      loginId: 'k',
    },
    {
      email: 'dana@gmail.com',
      phone: '78449264',
      loginId: 'dev_loper120386',
    },
  ],
})

const trimGroupNameToLowercase = (grp: string) => {
  return grp.split('_').join('').split(' ').join('').toLowerCase()
}

const generateRandomID = () => {
  return Math.random().toString(10).substring(2, 5)
}

const addLoginId = (obj: any): TeamProps => {
  let grpNameTitle = trimGroupNameToLowercase(obj.groupTitle)
  obj.members.forEach((e: any) => {
    e['loginId'] = grpNameTitle + generateRandomID()
  })
  return obj
}

const allTeams: Array<TeamProps> = [
  addLoginId(testOne),
  addLoginId(testTwo),
  addLoginId(testThree),
  Developer,
]

const allLoginIds: {
  [key: string]: { groupTitle: string; index: number; email: string }
} = {}

const allEmails: {
  [key: string]: { groupTitle: string; index: number; loginId: string }
} = {}

allTeams.forEach((team) => {
  team.members.forEach((member, index) => {
    allLoginIds[member.loginId] = {
      groupTitle: team.groupTitle,
      index,
      email: member.email,
    }
    allEmails[member.email] = {
      groupTitle: team.groupTitle,
      index,
      loginId: member.loginId,
    }
  })
})

const participants: ParticipantsData = objFromArray(allTeams, 'groupTitle')
participants['allLoginIds'] = allLoginIds
participants['allEmails'] = allEmails

export default participants
export { SOARInit }
