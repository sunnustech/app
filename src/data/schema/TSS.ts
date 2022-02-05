import { TSSSchedule, TSSKnockoutTable, TSSData } from './TSS.d'

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
    0: { A: '', B: '' },
    1: { A: '', B: '' },
    2: { A: '', B: '' },
    3: { A: '', B: '' },
    4: { A: '', B: '' },
    5: { A: '', B: '' },
    6: { A: '', B: '' },
    7: { A: '', B: '' },
  },
  quarterfinals: {
    0: { A: '', B: '' },
    1: { A: '', B: '' },
    2: { A: '', B: '' },
    3: { A: '', B: '' },
  },
  semifinals: {
    0: { A: '', B: '' },
    1: { A: '', B: '' },
  },
  finals: {
    0: { A: '', B: '' },
  },
}

const schedule: TSSSchedule = [
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
