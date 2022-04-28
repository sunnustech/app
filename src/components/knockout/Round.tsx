import PagerView from 'react-native-pager-view'
import { knockout as styles } from '@/styles/fresh'
import { Text, View } from 'react-native'
import { Match, Matches, PageStatus } from '@/types/TSS'
import PageIndicator from '@/components/knockout/PageIndicator'

const VSpacer = ({ h }: { h: number }) => <View style={{ height: h }} />

const getStatus = (match: Match): PageStatus => {
  if (match.winner !== 'U') {
    return 'completed'
  }
  if (match.A === '' && match.B === '') {
    return 'no-one'
  }
  if (match.A !== '' && match.B === '') {
    return 'one-in'
  }
  if (match.A !== '' && match.B !== '') {
    return 'both-in'
  }
  // TODO: probably use a time trigger for this, or maybe not at all
  // not important.
  return 'in-progress'
}

const MatchNode = ({
  match,
  total,
  current,
  statuses,
}: {
  match: Match
  total: number
  current: number
  statuses: PageStatus[]
}) => {
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
      <View style={{ flex: 1 }}>
        {match.A ? <Row team={match.A} score={match.scoreA} /> : <EmptyRow />}
        <VSpacer h={8} />
        {match.B ? <Row team={match.B} score={match.scoreB} /> : <EmptyRow />}
      </View>
      <PageIndicator total={total} current={current} statuses={statuses} />
    </View>
  )
}

const PagerRound = ({ matches }: { matches: Matches }) => {
  const arr = Object.keys(matches)
  const statuses: PageStatus[] = arr.map((_, i) => getStatus(matches[i]))

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {arr.map((_, i) => {
        const match = matches[i]
        return (
          <View key={i} style={styles.rowCenter}>
            <MatchNode match={match} total={arr.length} current={i} statuses={statuses} />
          </View>
        )
      })}
    </PagerView>
  )
}

export default PagerRound
