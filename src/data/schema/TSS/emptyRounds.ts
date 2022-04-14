import { Rounds } from '@/types/TSS'
import { createEmptyMatches } from './utils'

export const emptyRounds: Rounds = {
  round_of_32: createEmptyMatches(16),
  round_of_16: createEmptyMatches(8),
  quarterfinals: createEmptyMatches(4),
  semifinals: createEmptyMatches(2),
  finals: createEmptyMatches(1),
  champions: '',
}
