import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { httpsCallable } from 'firebase/functions'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import PickerProvider from '@/components/TSS/PickerProvider'
import { Match, Round, Sport, Winner } from '@/types/TSS'
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { auth, functions } from '@/sunnus/firebase'
import { matchNumbers, sportList, roundList } from '@/data/constants'
import Picker, { Item } from 'react-native-picker-select'
import { getItems, replaceUnderscoresWithSpaces } from '@/lib/utils'
import CustomPicker from '@/components/TSS/CustomPicker'
import { UseState } from '@/types/SOAR'
import { LastContext } from '@/contexts/LastContext'

type Field = 'sport' | 'round' | 'matchNumber' | 'winner'

const TSSScreen = () => {
  const navigation = useNavigation<TSSPage<'TSSScreen'>>()
  const fields: Array<Field> = ['sport', 'round', 'matchNumber', 'winner']
  const { roundData, sport, setSport } = useContext(LastContext)

  function getSlotFromTeamName(teamName: string): 'A' | 'B' {
    const match: Match = roundData[round][matchNumber]
    for (const [key, value] of Object.entries(match)) {
      if (value === teamName) {
        if (key === 'A') {
          return 'A'
        } else if (key === 'B') {
          return 'B'
        }
      }
    }
    return 'A'
  }

  type DisplayStates = {
    sport: UseState<Sport>
    round: UseState<Round>
    matchNumber: UseState<number>
    winner: UseState<string>
  }

  const [winnerCode, setWinnerCode] = useState<'A' | 'B'>('A')

  const roundState = useState<Round>('round_of_32')
  const matchNumberState = useState(0)

  const round = roundState[0]
  const matchNumber = matchNumberState[0]

  const states: DisplayStates = {
    sport: [sport, setSport],
    matchNumber: matchNumberState,
    round: roundState,
    winner: useState<string>('---'),
  }

  const winner = states.winner[0]

  const display: DisplayStates = {
    sport: useState<Sport>(sport),
    matchNumber: useState(0),
    winner: useState<string>(winner),
    round: useState<Round>('round_of_32'),
  }

  const refs: Record<Field, MutableRefObject<Picker | null>> = {
    sport: useRef<Picker>(null),
    round: useRef<Picker>(null),
    matchNumber: useRef<Picker>(null),
    winner: useRef<Picker>(null),
  }

  /* when the winner team name changes, update the winner code */
  useEffect(() => {
    setWinnerCode(getSlotFromTeamName(winner))
  }, [winner])

  /* when the match number changes, refresh the team names */
  useEffect(() => {
    // use match number to update winner
    const A = roundData[round][matchNumber].A
    const B = roundData[round][matchNumber].B
    states.winner[1](A ? A : '---')
    display.winner[1](A ? A : '---')

    // update winner items
    items.winner[1](getItems([A !== '' ? A : '---', B !== '' ? B : '---']))
    scoreRefA.current?.clear()
    scoreRefB.current?.clear()
  }, [matchNumber])

  /* when the round changes, reset the match number to zero */
  useEffect(() => {
    // console.log('!round -> match number')
    items.matchNumber[1](getItems(matchNumbers[round]))
    states.matchNumber[1](0)
    display.matchNumber[1](0)

    const A = roundData[round][0].A
    states.winner[1](A ? A : '---')
    display.winner[1](A ? A : '---')
    scoreRefA.current?.clear()
    scoreRefB.current?.clear()
  }, [round])

  /* when the data changes, only change team names */
  useEffect(() => {
    // update winner items
    const A = roundData[round][matchNumber].A
    const B = roundData[round][matchNumber].B
    items.winner[1](getItems([A !== '' ? A : '---', B !== '' ? B : '---']))
    // reattach display state properly using current winner code
    states.winner[1](roundData[round][matchNumber][winnerCode])
    display.winner[1](roundData[round][matchNumber][winnerCode])
  }, [roundData])

  const handleConfirm = () => {
    const sport = states.sport[0]
    const round = states.round[0]
    const matchNumber = states.matchNumber[0]
    const email = auth.currentUser
      ? auth.currentUser.email
      : 'no-email@nomail.com'
    var outcome: Winner
    if (scoreA === scoreB) {
      outcome = 'U'
    }
    outcome = scoreA > scoreB ? 'A' : 'B'
    const request = {
      series: 'TSS',
      sport,
      round,
      matchNumber,
      A: roundData[round][matchNumber].A,
      B: roundData[round][matchNumber].B,
      winner: outcome,
      scoreA,
      scoreB,
      facilitatorEmail: email,
    }
    /* if the scores are untouched, send a toast */
    if (scoreA === -1 || scoreB === -1) {
      console.log('please key in both scores', winnerCode)
      return
    }
    const firebaseHandleMatch = httpsCallable(functions, 'handleMatch')
    firebaseHandleMatch(request)
    console.log('request sent:', request)
  }

  const items = {
    sport: useState<Item[]>([]),
    round: useState<Item[]>([]),
    matchNumber: useState<Item[]>([]),
    winner: useState<Item[]>([]),
  }

  // initialize default items (don't let this depend on roundData)
  useEffect(() => {
    items.sport[1](getItems(sportList))
    items.round[1](getItems(roundList))
    items.matchNumber[1](getItems(matchNumbers[round]))
    items.winner[1](getItems(['---', '---']))
  }, [])

  const [scoreA, setScoreA] = useState(-1)
  const [scoreB, setScoreB] = useState(-1)
  const scoreRefA = useRef<TextInput>(null)
  const scoreRefB = useRef<TextInput>(null)

  const teamNameA = replaceUnderscoresWithSpaces(
    roundData[round][matchNumber].A
  )
  const teamNameB = replaceUnderscoresWithSpaces(
    roundData[round][matchNumber].B
  )

  /* to sync up value of sport/tempSport with match handler page */
  useEffect(() => {
    display.sport[1](sport)
  }, [sport])

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
      <Text style={styles.titleText}>TSS Match Update Tool</Text>

      <View style={styles.numberInputContainer}>
        <View style={styles.numberInputTeamContainer}>
          <View style={styles.numberInputTeamNameContainer}>
            <Text numberOfLines={2} style={styles.numberInputTeamName}>
              {teamNameA}
            </Text>
          </View>
          <TextInput
            ref={scoreRefA}
            onChangeText={(text) => setScoreA(parseInt(text))}
            placeholder="_"
            placeholderTextColor="#d4d4d8"
            style={styles.numberInput}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </View>
        <View style={styles.numberInputSpacer} />
        <View style={styles.numberInputTeamContainer}>
          <View style={styles.numberInputTeamNameContainer}>
            <Text numberOfLines={2} style={styles.numberInputTeamName}>
              {teamNameB}
            </Text>
          </View>
          <TextInput
            ref={scoreRefB}
            onChangeText={(text) => setScoreB(parseInt(text))}
            placeholder="_"
            placeholderTextColor="#d4d4d8"
            style={styles.numberInput}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </View>
      </View>
      {fields.map((field, idx) => {
        return (
          <PickerProvider
            _ref={refs[field]}
            setState={states[field][1]}
            display={display[field]}
            items={items[field][0]}
            key={idx}
          />
        )
      })}
      {fields.map((field, idx) => {
        if (field !== 'winner') {
          return (
            <CustomPicker
              pickerRef={refs[field]}
              display={display[field][0]}
              key={idx}
            />
          )
        }
      })}

      <TouchableOpacity onPress={handleConfirm} style={styles.confirmContainer}>
        <View style={styles.confirmTextContainer}>
          <Text style={styles.confirmText}>Confirm</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default TSSScreen
