import { KeyboardAvoidingView, Text, View } from 'react-native'

/* sunnus components */
import { auth, db } from '@/sunnus/firebase'
import { Button, ButtonGreen } from '@/components/Buttons'
import styles from '@/styles/main'
import typedTSS from '@/data/schema/TSS'
import push from '@/data/push'

function resetTSS() {
  push({ collection: 'TSS', data: typedTSS })
}

const KnockoutTable = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>The one place for knockout table development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={() => resetTSS()}>Reset TSS Data</ButtonGreen>
      </View>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
