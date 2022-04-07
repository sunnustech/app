import PagerView from 'react-native-pager-view'
import { filledRounds } from '@/data/schema/TSS'
import { knockout as styles } from '@/styles/fresh'
import { Text, View } from 'react-native'
import { Match, Round } from '@/types/TSS'

const VSpacer = ({ h }: { h: number }) => <View style={{ height: h }} />

const MatchNode = ({ match }: { match: Match }) => {
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

  return (
    <View style={styles.matchNodeContainer}>
      <Row team={match.A} score={scores[0]} />
      <VSpacer h={8} />
      <Row team={match.B} score={scores[1]} />
    </View>
  )
}

const PagerRound = ({
  round,
  _ref,
}: {
  round: Round
  _ref: any
}) => {
  const data = filledRounds[round]
  return (
    <PagerView style={styles.pagerView} initialPage={0} ref={_ref}>
      {Object.keys(data).map((e: string, i) => {
        const key = parseInt(e)
        return (
          <View
            key={i}
            style={{ flexDirection: 'row', justifyContent: 'center' }}
          >
            <MatchNode match={data[key]} />
          </View>
        )
      })}
    </PagerView>
  )
}

export default PagerRound
