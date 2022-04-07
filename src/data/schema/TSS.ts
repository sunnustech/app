import { TSSSchedule, Rounds, TSSDatabase } from '@/types/TSS'

export const emptyRounds: Rounds = {
  round_of_32: {},
  round_of_16: {},
  quarterfinals: {},
  semifinals: {},
  finals: {},
  champions: '',
}

export const sampleRounds: Rounds = {
  round_of_32: {
    0: { A: 'Independent_Decorators', B: 'Gentle_Sweaters', winner: 'U' },
    1: { A: 'Known_Painters', B: 'Modest_Liberators', winner: 'U' },
    2: { A: 'Poor_Philosophers', B: 'Written_Particulars', winner: 'U' },
    3: { A: 'Handicapped_Silvers', B: 'Remaining_Masters', winner: 'U' },
    4: { A: 'Vulnerable_Council', B: 'Real_Lasers', winner: 'U' },
    5: { A: 'Elaborate_Solvents', B: 'Sophisticated_Crystals', winner: 'U' },
    6: { A: 'Influential_Realtors', B: 'Irrelevant_Readers', winner: 'U' },
    7: { A: 'Harvard_Graduates', B: 'Lingustic_Reformers', winner: 'U' },
    8: { A: 'Unfortunate_Landlords', B: 'Magical_Publishers', winner: 'U' },
    9: { A: 'Violent_Bathers', B: 'Eventual_Resters', winner: 'U' },
    10: { A: 'Intimate_Creditors', B: 'Domestic_Populators', winner: 'U' },
    11: { A: 'Blonde_Stoppers', B: 'Mass_Activators', winner: 'U' },
    12: { A: 'Emotional_Writers', B: 'Rich_Searchers', winner: 'U' },
    13: { A: 'Crucial_Managers', B: 'Coastal_Housers', winner: 'U' },
    14: { A: 'Useful_Wanters', B: 'Foolish_Reasoners', winner: 'U' },
    15: { A: 'Representative_Witnesses', B: 'Prone_Artists', winner: 'U' },
  },
  round_of_16: {
    /*
    0: { A: 'Independent_Decorators', B: 'Modest_Liberators', winner: 'U' },
    1: { A: 'Poor_Philosophers', B: 'Remaining_Masters', winner: 'U' },
    2: { A: 'Vulnerable_Council', B: 'Sophisticated_Crystals', winner: 'U' },
    3: { A: 'Influential_Realtors', B: 'Lingustic_Reformers', winner: 'U' },
    4: { A: 'Unfortunate_Landlords', B: 'Eventual_Resters', winner: 'U' },
    5: { A: 'Intimate_Creditors', B: 'Mass_Activators', winner: 'U' },
    6: { A: 'Emotional_Writers', B: 'Coastal_Housers', winner: 'U' },
    7: { A: 'Useful_Wanters', B: 'Prone_Artists', winner: 'U' },
    */
  },
  quarterfinals: {
    /*
    0: { A: 'Independent_Decorators', B: 'Remaining_Masters', winner: 'U' },
    1: { A: 'Vulnerable_Council', B: 'Lingustic_Reformers', winner: 'U' },
    2: { A: 'Unfortunate_Landlords', B: 'Mass_Activators', winner: 'U' },
    3: { A: 'Emotional_Writers', B: 'Prone_Artists', winner: 'U' },
    */
  },
  semifinals: {
    /*
    0: { A: 'Independent_Decorators', B: 'Lingustic_Reformers', winner: 'U' },
    1: { A: 'Unfortunate_Landlords', B: 'Prone_Artists', winner: 'U' },
    */
  },
  finals: {
    /*
    0: { A: 'Independent_Decorators', B: 'Prone_Artists', winner: 'U' },
    */
  },
  champions: '',
}

export const filledRounds: Rounds = {
  round_of_32: {
    0: { A: 'Independent_Decorators', B: 'Gentle_Sweaters', winner: 'U' },
    1: { A: 'Known_Painters', B: 'Modest_Liberators', winner: 'U' },
    2: { A: 'Poor_Philosophers', B: 'Written_Particulars', winner: 'U' },
    3: { A: 'Handicapped_Silvers', B: 'Remaining_Masters', winner: 'U' },
    4: { A: 'Vulnerable_Council', B: 'Real_Lasers', winner: 'U' },
    5: { A: 'Elaborate_Solvents', B: 'Sophisticated_Crystals', winner: 'U' },
    6: { A: 'Influential_Realtors', B: 'Irrelevant_Readers', winner: 'U' },
    7: { A: 'Harvard_Graduates', B: 'Lingustic_Reformers', winner: 'U' },
    8: { A: 'Unfortunate_Landlords', B: 'Magical_Publishers', winner: 'U' },
    9: { A: 'Violent_Bathers', B: 'Eventual_Resters', winner: 'U' },
    10: { A: 'Intimate_Creditors', B: 'Domestic_Populators', winner: 'U' },
    11: { A: 'Blonde_Stoppers', B: 'Mass_Activators', winner: 'U' },
    12: { A: 'Emotional_Writers', B: 'Rich_Searchers', winner: 'U' },
    13: { A: 'Crucial_Managers', B: 'Coastal_Housers', winner: 'U' },
    14: { A: 'Useful_Wanters', B: 'Foolish_Reasoners', winner: 'U' },
    15: { A: 'Representative_Witnesses', B: 'Prone_Artists', winner: 'U' },
  },
  round_of_16: {
    0: { A: 'Independent_Decorators', B: 'Modest_Liberators', winner: 'U' },
    1: { A: 'Poor_Philosophers', B: 'Remaining_Masters', winner: 'U' },
    2: { A: 'Vulnerable_Council', B: 'Sophisticated_Crystals', winner: 'U' },
    3: { A: 'Influential_Realtors', B: 'Lingustic_Reformers', winner: 'U' },
    4: { A: 'Unfortunate_Landlords', B: 'Eventual_Resters', winner: 'U' },
    5: { A: 'Intimate_Creditors', B: 'Mass_Activators', winner: 'U' },
    6: { A: 'Emotional_Writers', B: 'Coastal_Housers', winner: 'U' },
    7: { A: 'Useful_Wanters', B: 'Prone_Artists', winner: 'U' },
  },
  quarterfinals: {
    0: { A: 'Independent_Decorators', B: 'Remaining_Masters', winner: 'U' },
    1: { A: 'Vulnerable_Council', B: 'Lingustic_Reformers', winner: 'U' },
    2: { A: 'Unfortunate_Landlords', B: 'Mass_Activators', winner: 'U' },
    3: { A: 'Emotional_Writers', B: 'Prone_Artists', winner: 'U' },
  },
  semifinals: {
    0: { A: 'Independent_Decorators', B: 'Lingustic_Reformers', winner: 'U' },
    1: { A: 'Unfortunate_Landlords', B: 'Prone_Artists', winner: 'U' },
  },
  finals: {
    0: { A: 'Independent_Decorators', B: 'Prone_Artists', winner: 'U' },
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

const TSS: TSSDatabase = {
  dodgeball: sampleRounds,
  frisbee: sampleRounds,
  volleyball: sampleRounds,
  tchoukball: sampleRounds,
  data: {
    schedule,
  },
}

export default TSS
