import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { knockout as styles } from '@/styles/fresh'
import { useState } from 'react'
import { Match, Sport } from '@/types/TSS'
import { sportList } from '@/data/constants'
import PagerView from 'react-native-pager-view'

const VSpacer = ({ h }: { h: number }) => <View style={{ height: h }} />

const MatchNode = ({ match }: { match: Match }) => {
  // TODO: incorporate scores into Match classes
  const scores = [1, 0]

  const Row = ({ team, score }: {team: string, score: number}) => {
    return (
      <View style={styles.matchNodeRow}>
        <View style={styles.matchNodeTeam}>
          <Text style={styles.matchNodeTeamText} numberOfLines={1}>
            {team}
          </Text>
        </View>
        <View style={styles.matchNodeScore}>
          <Text style={styles.matchNodeScoreText} numberOfLines={1}>
            {score}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.matchNodeContainer}>
      <Row team={match.A} score={scores[0]} />
      <VSpacer h={8} />
      <Row team={match.B} score={scores[1]} />
    </View>
  )
}

const RoundOf32 = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </PagerView>
  )
}

const KnockoutTable = ({ sportState }: any) => {
  const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const [sport, setSport] = sportState
  const [tempSport, setTempSport] = useState<Sport>(sport)

  /* currently when you change the sport using the picker,
   * the picker seems to jump back to showing
   * "Select an item...". This is because it calls setSport,
   * which triggers a re-render of this entire component
   *
   * may not need to fix if method of choosing sport changes later
   */
  const testMatch: Match = {
    A: 'Independent_Decorators',
    B: 'Gentle_Sweaters',
    winner: 'U',
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <RNPickerSelect
        onValueChange={(value) => setTempSport(value)}
        onDonePress={() => setSport(tempSport)}
        items={sportList.map((sport, i) => ({
          label: sport,
          value: sport,
          key: i,
        }))}
      />
      <Text>Welcome to the TSS Knockout Table!</Text>
      <Text>Sport: {sport}</Text>
      <RoundOf32 />
      <MatchNode match={testMatch} />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
