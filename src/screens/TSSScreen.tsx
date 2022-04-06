import { KeyboardAvoidingView, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* navigation */
import { AuthPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { Button } from '../components/Buttons'
import { getKnockoutTable, handleMatch } from '../lib/knockout'
import { MatchRequest, Round, Sport, Winner } from '../types/TSS'
import { useState } from 'react'

const TSSScreen = () => {
  const [sport, setSport] = useState<Sport>('dodgeball')
  const [matchNumber, setMatchNumber] = useState(0)
  const [winner, setWinner] = useState<Winner>('U')
  const [round, setRound] = useState<Round>('round_of_32')

  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScreen'>>()
  // const navigation = useNavigation<DrawerNavigationProp<AuthenticatedPages, 'TSSScren'>>()

  const navigation = useNavigation<AuthPage<'TSSScreen'>>()

  const tempFunction = async () => {
    let obj: MatchRequest = {
      sport: sport,
      matchNumber: matchNumber,
      winner: winner,
      round: round,
    }
    handleMatch(obj)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS page!</Text>
      <Text>Choose sport</Text>
      <RNPickerSelect
        onValueChange={(value) => setSport(value)}
        items={[
          { label: 'dodgeball', value: 'dodgeball', key: 0 },
          { label: 'frisbee', value: 'frisbee', key: 1 },
          { label: 'tchoukball', value: 'tchoukball', key: 2 },
          { label: 'volleyball', value: 'volleyball', key: 3 },
        ]}
      />
      <Text>Choose match Number</Text>
      <RNPickerSelect
        onValueChange={(value) => setMatchNumber(value)}
        items={[
          { label: '0', value: 0, key: 0 },
          { label: '1', value: 1, key: 1 },
          { label: '2', value: 2, key: 2 },
          { label: '3', value: 3, key: 3 },
          { label: '4', value: 4, key: 4 },
          { label: '5', value: 5, key: 5 },
          { label: '6', value: 6, key: 6 },
          { label: '7', value: 7, key: 7 },
          { label: '8', value: 8, key: 8 },
          { label: '9', value: 9, key: 9 },
          { label: '10', value: 10, key: 10 },
          { label: '11', value: 11, key: 11 },
          { label: '12', value: 12, key: 12 },
          { label: '13', value: 13, key: 13 },
          { label: '14', value: 14, key: 14 },
          { label: '15', value: 15, key: 15 },
        ]}
      />
      <Text>Choose winner</Text>
      <RNPickerSelect
        onValueChange={(value) => setWinner(value)}
        items={[
          { label: 'A', value: 'A', key: 0 },
          { label: 'B', value: 'B', key: 1 },
        ]}
      />
      <Text>Choose round</Text>
      <RNPickerSelect
        onValueChange={(value) => setRound(value)}
        items={[
          { label: '32', value: 'round_of_32', key: 0 },
          { label: '16', value: 'round_of_16', key: 1 },
          { label: '8', value: 'quarterfinals', key: 2 },
          { label: '4', value: 'semifinals', key: 3 },
          { label: '2', value: 'finals', key: 4 },
        ]}
      />
      <Text>(you can navigate back by swiping in from the left)</Text>
      <Button onPress={tempFunction}>Test</Button>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
