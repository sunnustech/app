// imports {{{
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

/* sunnus components */
import { ButtonGreen } from '@/components/Buttons'
import styles from '@/styles/main'
import { delimiter } from '@/lib/knockout'
import { Sport } from '@/data/schema/TSS.d'
import { useState } from 'react'
import tw from 'twrnc'
import { Knockout } from '@/components/Knockout'
// }}}

const KnockoutTree = () => {
  const [sport, setSport] = useState<Sport>('volleyball')

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>The one place for knockout tree development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={() => debugKnockoutTree({ sport })}>
          Debug Table
        </ButtonGreen>
      </View>
      <Knockout />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTree
