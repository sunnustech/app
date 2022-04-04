import { TSSSchedule, TSSKnockoutTable, TSSData } from '@/types/TSS'

const sampleKnockoutTable: TSSKnockoutTable = {
  round_of_32: {
    0: { A: 'Independent_Decorators', B: 'Gentle_Sweaters' },
    1: { A: 'Known_Painters', B: 'Modest_Liberators' },
    2: { A: 'Poor_Philosophers', B: 'Written_Particulars' },
    3: { A: 'Handicapped_Silvers', B: 'Remaining_Masters' },
    4: { A: 'Vulnerable_Council', B: 'Real_Lasers' },
    5: { A: 'Elaborate_Solvents', B: 'Sophisticated_Crystals' },
    6: { A: 'Influential_Realtors', B: 'Irrelevant_Readers' },
    7: { A: 'Harvard_Graduates', B: 'Lingustic_Reformers' },
    8: { A: 'Unfortunate_Landlords', B: 'Magical_Publishers' },
    9: { A: 'Violent_Bathers', B: 'Eventual_Resters' },
    10: { A: 'Intimate_Creditors', B: 'Domestic_Populators' },
    11: { A: 'Blonde_Stoppers', B: 'Mass_Activators' },
    12: { A: 'Emotional_Writers', B: 'Rich_Searchers' },
    13: { A: 'Crucial_Managers', B: 'Coastal_Housers' },
    14: { A: 'Useful_Wanters', B: 'Foolish_Reasoners' },
    15: { A: 'Representative_Witnesses', B: 'Prone_Artists' },
  },
  round_of_16: {
    0: { A: 'Independent_Decorators', B: 'Modest_Liberators' },
    1: { A: 'Poor_Philosophers', B: 'Remaining_Masters' },
    2: { A: 'Vulnerable_Council', B: 'Sophisticated_Crystals' },
    3: { A: 'Influential_Realtors', B: 'Lingustic_Reformers' },
    4: { A: 'Unfortunate_Landlords', B: 'Eventual_Resters' },
    5: { A: 'Intimate_Creditors', B: 'Mass_Activators' },
    6: { A: 'Emotional_Writers', B: 'Coastal_Housers' },
    7: { A: 'Useful_Wanters', B: 'Prone_Artists' },
  },
  quarterfinals: {
    0: { A: 'Independent_Decorators', B: 'Remaining_Masters' },
    1: { A: 'Vulnerable_Council', B: 'Lingustic_Reformers' },
    2: { A: 'Unfortunate_Landlords', B: 'Mass_Activators' },
    3: { A: 'Emotional_Writers', B: 'Prone_Artists' },
  },
  semifinals: {
    0: { A: 'Independent_Decorators', B: 'Lingustic_Reformers' },
    1: { A: 'Unfortunate_Landlords', B: 'Prone_Artists' },
  },
  finals: {
    0: { A: 'Independent_Decorators', B: 'Prone_Artists' },
  },
  champions: '',
}

const schedule: TSSSchedule = [
  {
    id: 1,
    title: 'Dodgeball Semi-finals',
    sport: 'dodgeball',
    time: '15:00',
    venue: 'Court 3',
    teams: ['HS123', 'Known_Painters'],
  },
  {
    id: 2,
    title: 'Volleyball Qualifiers',
    sport: 'volleyball',
    time: '15:00',
    venue: 'Court 4',
    teams: ['HS123', 'Modest_Liberators'],
  },
  {
    id: 3,
    title: 'Frisbee Finals',
    sport: 'frisbee',
    time: '15:00',
    venue: 'Court 5',
    teams: ['Modest_Liberators', 'Known_Painters'],
  },
  {
    id: 4,
    title: 'Prize Presentation',
    sport: 'misc',
    time: '16:00',
    venue: 'Stage',
    teams: [],
  },
]

const TSS: TSSData = {
  dodgeball: sampleKnockoutTable,
  frisbee: sampleKnockoutTable,
  volleyball: sampleKnockoutTable,
  tchoukball: sampleKnockoutTable,
  data: {
    schedule,
  },
}

export default TSS
