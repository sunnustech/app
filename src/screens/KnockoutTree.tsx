// imports {{{
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* sunnus components */
import { Button, ButtonGreen, ButtonRed } from '@/components/Buttons'
import styles from '@/styles/main'
import { delimiter, getKnockoutTable } from '@/lib/knockout'
import TSS from '@/data/schema/TSS'
import { Sport } from '@/data/schema/TSS.d'
import { MatchRequest, Round } from '@/lib/knockout.d'
import { useState } from 'react'
// }}}

const KnockoutTable = () => {
  const [sport, setSport] = useState<Sport>('volleyball')

  function debugKnockoutTable({ sport }: { sport: Sport }) {
    getKnockoutTable({ sport }).then((data) => {
      delimiter()
      console.log(sport, data)
      delimiter()
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>The one place for knockout tree development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={() => debugKnockoutTable({ sport })}>
          Debug Table
        </ButtonGreen>
      </View>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
