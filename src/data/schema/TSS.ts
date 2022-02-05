import { TSSSchedule, TSSKnockoutTable, TSSData } from './TSS.d'

const sampleKnockoutTable: TSSKnockoutTable = {
  round_of_32: {
    0: ['Independent_Decorators', 'Gentle_Sweaters'],
    1: ['Known_Painters', 'Modest_Liberators'],
    2: ['Poor_Philosophers', 'Written_Particulars'],
    3: ['Handicapped_Silvers', 'Remaining_Masters'],
    4: ['Vulnerable_Council', 'Real_Lasers'],
    5: ['Elaborate_Solvents', 'Sophisticated_Crystals'],
    6: ['Influential_Realtors', 'Irrelevant_Readers'],
    7: ['Harvard_Graduates', 'Lingustic_Reformers'],
    8: ['Unfortunate_Landlords', 'Magical_Publishers'],
    9: ['Violent_Bathers', 'Eventual_Resters'],
    10: ['Intimate_Creditors', 'Domestic_Populators'],
    11: ['Blonde_Stoppers', 'Mass_Activators'],
    12: ['Emotional_Writers', 'Rich_Searchers'],
    13: ['Crucial_Managers', 'Coastal_Housers'],
    14: ['Useful_Wanters', 'Foolish_Reasoners'],
    15: ['Representative_Witnesses', 'Prone_Artists'],
  },
  round_of_16: {
    0: ['', ''],
    1: ['', ''],
    2: ['', ''],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['', ''],
  },
  quarterfinals: {
    0: ['', ''],
    1: ['', ''],
    2: ['', ''],
    3: ['', ''],
  },
  semifinals: {
    0: ['', ''],
    1: ['', ''],
  },
  finals: {
    0: ['', ''],
  },
  champion: '',
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
