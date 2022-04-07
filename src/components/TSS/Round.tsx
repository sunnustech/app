import PagerView from 'react-native-pager-view'
import { filledRounds } from '@/data/schema/TSS'
import { knockout as styles } from '@/styles/fresh'
import { Text, View } from 'react-native'
import { Match, Matches, Round } from '@/types/TSS'
import PageIndicator from '@/components/TSS/PageIndicator'

const VSpacer = ({ h }: { h: number }) => <View style={{ height: h }} />

const MatchNode = ({
  match,
  total,
  current,
}: {
  match: Match
  total: number
  current: number
}) => {
  // TODO: incorporate scores into Match classes
  const scores = [1, 0]

  const Row = ({ team, score }: { team: string; score: number }) => {
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

  const EmptyRow = () => {
    return (
      <View style={styles.matchNodeRow}>
        <View style={styles.matchNodeTeam}>
          <Text style={styles.emptyMatchNodeTeamText} numberOfLines={1}>
            ---
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.matchNodeContainer}>
      <View style={{flex: 1}}>
      {match.A ? <Row team={match.A} score={scores[0]} /> : <EmptyRow />}
      <VSpacer h={8} />
      {match.B ? <Row team={match.B} score={scores[0]} /> : <EmptyRow />}
      </View>
      <PageIndicator total={total} current={current} />
    </View>
  )
}

const PagerRound = ({ matches }: { matches: Matches }) => {
  const arr = Object.keys(matches)

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {arr.map((_, i) => (
        <View key={i} style={styles.rowCenter}>
          <MatchNode match={matches[i]} total={arr.length} current={i} />
        </View>
      ))}
    </PagerView>
  )
}

export default PagerRound
