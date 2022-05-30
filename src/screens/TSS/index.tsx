import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  SafeAreaView,
} from 'react-native'
import { httpsCallable } from 'firebase/functions'

/* navigation */
// import { TSSPage } from '@/types/navigation'
// import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import PickerProvider from '@/components/knockout/PickerProvider'
import { Field, Round, Sport, Winner } from '@/types/TSS'
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
import { replaceUnderscoresWithSpaces } from '@/lib/utils'
import { getPickerItems } from '@/lib/picker'
import CustomPicker from '@/components/knockout/CustomPicker'
import { LastContext } from '@/contexts/LastContext'
import { OnPress } from '@/types/index'
import colors from '@/styles/colors'
import { AuthPage } from '@/types/navigation'
import BackButton from '@/components/BackButton'
import { globalStyles } from '../../styles/global'
import { Button } from '../../components/Buttons'
import { UseState } from '../../types/SOAR'

const FinalButton = ({
  onPress,
  containerStyle,
  textStyle,
  text,
}: {
  onPress: OnPress
  containerStyle: StyleProp<ViewStyle>
  textStyle: StyleProp<TextStyle>
  text: string
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyles.button.pill.tss, containerStyle]}
    >
      <View style={styles.buttonTextContainer}>
        <Text style={[styles.buttonBaseText, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

type RoundWithRobin = Round | 'round_robin'
type FieldStates = {
  sport: UseState<Sport>
  round: UseState<RoundWithRobin>
  matchNumber: UseState<number>
}

const TSSScreen = ({
  navigation,
}: {
  navigation: AuthPage<'TSSNavigator'>
}) => {
  // const navigation = useNavigation<TSSPage<'TSSScreen'>>()
  const fields: Field[] = ['sport', 'round', 'matchNumber']
  const { roundData, sport, setSport, schedule } = useContext(LastContext)
  const roundState = useState<RoundWithRobin>('quarterfinals')
  const matchNumberState = useState<number>(0)
  const round = roundState[0]
  const matchNumber = matchNumberState[0]

  /* requirements for picker handling */
  const states: FieldStates = {
    sport: [sport, setSport],
    matchNumber: matchNumberState,
    round: roundState,
  }
  const display: FieldStates = {
    sport: useState<Sport>(sport),
    matchNumber: useState(0),
    round: useState<RoundWithRobin>('quarterfinals'),
  }
  const refs: Record<Field, MutableRefObject<Picker | null>> = {
    sport: useRef<Picker>(null),
    round: useRef<Picker>(null),
    matchNumber: useRef<Picker>(null),
  }

  /* when the match number changes, refresh the team names */
  useEffect(() => {
    // clear scores
    scoreRefA.current?.clear()
    scoreRefB.current?.clear()
    console.log(matchNumber)
  }, [matchNumber])

  /* when the round changes, reset the match number to zero */
  useEffect(() => {
    if (round !== 'round_robin') {
      items.matchNumber[1](getPickerItems(matchNumbers[round]))
      states.matchNumber[1](0)
      display.matchNumber[1](0)
    }

    // clear scores
    scoreRefA.current?.clear()
    scoreRefB.current?.clear()
  }, [round])

  const handleConfirm = () => {
    if (round !== 'round_robin') {
      setGonnaSend(false)
      const email = auth.currentUser
        ? auth.currentUser.email
        : 'noreply-mail.com'
      const outcome: Winner =
        scoreA === scoreB ? 'U' : scoreA > scoreB ? 'A' : 'B'
      const request = {
        series: 'TSS',
        sport: states.sport[0],
        round: states.round[0],
        matchNumber: states.matchNumber[0],
        A: roundData[round][matchNumber].A,
        B: roundData[round][matchNumber].B,
        winner: outcome,
        scoreA,
        scoreB,
        facilitatorEmail: email,
      }
      /* if the scores are untouched, send a toast */
      if (scoreA === -1 || scoreB === -1) {
        console.debug('please key in both scores')
        return
      }
      // TODO add confirmation modal
      const firebaseHandleMatch = httpsCallable(functions, 'handleMatch')
      firebaseHandleMatch(request)
      // TODO: add successful response notice
    }
    const firebaseHandleMatch = httpsCallable(functions, 'development-updateSchedule')
    firebaseHandleMatch({
      id: matchNumber,
      sport,
      matchNumber,
      round: 'round_robin',
      facilitatorEmail: 'yes',
      scoreA,
      scoreB,
      A: 'yes',
      B: 'yes',
      winner: 'U',
    })
  }

  const items = {
    sport: useState<Item[]>([]),
    round: useState<Item[]>([]),
    matchNumber: useState<Item[]>([]),
  }

  // initialize default items (don't let this depend on roundData)
  useEffect(() => {
    items.sport[1](getPickerItems(sportList))
    items.round[1](
      getPickerItems(['finals', 'semifinals', 'quarterfinals', 'round_robin'])
    )
    if (round !== 'round_robin') {
      items.matchNumber[1](getPickerItems(matchNumbers[round]))
    } else {
      items.matchNumber[1](
        getPickerItems(schedule.map((x) => `${x.id}`).sort())
      )
      console.log(matchNumber)
    }
  }, [round])

  const [scoreA, setScoreA] = useState(-1)
  const [scoreB, setScoreB] = useState(-1)
  const scoreRefA = useRef<TextInput>(null)
  const scoreRefB = useRef<TextInput>(null)

  const _matchNumber = typeof matchNumber === 'string' ? 0 : matchNumber
  const teamNameA =
    round !== 'round_robin'
      ? replaceUnderscoresWithSpaces(roundData[round][_matchNumber].A)
      : schedule.find((x) => x.id === matchNumber)?.A || 'not found'
  const teamNameB =
    round !== 'round_robin'
      ? replaceUnderscoresWithSpaces(roundData[round][_matchNumber].B)
      : schedule.find((x) => x.id === matchNumber)?.B || 'not found'

  /* to sync up value of sport/tempSport with match handler page */
  useEffect(() => {
    display.sport[1](sport)
  }, [sport])

  /* confirmation handling */
  const [gonnaSend, setGonnaSend] = useState(false)

  return (
    <SafeAreaView style={globalStyles.container.base}>
      <BackButton navigation={navigation} text="TSS Match Update Tool" />
      <View style={styles.container}>
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
              placeholderTextColor={colors.gray[300]}
              style={styles.numberInput}
              keyboardType="number-pad"
              returnKeyType="done"
              numberOfLines={1}
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
              placeholderTextColor={colors.gray[300]}
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
        {fields.map((field, idx) => (
          <CustomPicker
            pickerRef={refs[field]}
            display={display[field][0]}
            key={idx}
          />
        ))}

        <View style={styles.bottomAreaButtonContainer}>
          {gonnaSend ? (
            <>
              <Button
                onPress={() => setGonnaSend(false)}
                color="red"
                children="Go Back"
              />
              <View style={{ width: 10 }} />
              <Button
                onPress={handleConfirm}
                color="green"
                children="Confirm"
              />
            </>
          ) : (
            <Button
              onPress={() => setGonnaSend(true)}
              color="green"
              children="Push"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default TSSScreen
