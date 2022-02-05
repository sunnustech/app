import { KeyboardAvoidingView, Text, View } from 'react-native'

/* sunnus components */
import { Button, ButtonGreen } from '@/components/Buttons'
import styles from '@/styles/main'
import { resetTSS, handleMatch } from '@/lib/knockout'
import { MatchRequest } from '@/lib/knockout.d'

const KnockoutTable = () => {
  // to be interactively keyed in eventually
  const matchData: MatchRequest = {
    sport: 'volleyball',
    round: 'round_of_16',
    matchNumber: 5,
    winner: 'B',
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>The one place for knockout table development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
        <Text>
          Independent_Decorators wins Gentle_Sweaters in the round of 32 in
          volleyball
        </Text>
        <Button onPress={() => handleMatch(matchData)}>Handle Match End</Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
