import { KeyboardAvoidingView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'
import { Sport } from '@/types/TSS'
import { db } from '@/sunnus/firebase'
import { TeamProps } from '@/types/participants'

const KnockoutTable = ({ sportState }: any) => {
  const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const [sport, setSport] = sportState

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS Knockout Table!</Text>
      <Text>Sport: {sport}</Text>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
