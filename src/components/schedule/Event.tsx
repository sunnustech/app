import {
  View,
  Text as RNText,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import styles from '@/styles/schedule'
import { EventProps } from '@/types/schedule'
import { Feather } from '@expo/vector-icons'
import {
  replaceUnderscoresWithSpaces as RU,
  capitalizeFirstLetters as CFL,
} from '@/lib/utils'
import { ReactNode } from 'react'
import colors from '@/styles/colors'
import { HSpacer } from '@/components/utils'

const prettify = (s: string) => CFL(RU(s))

const Segment = (props: { children: ReactNode }) => (
  <View style={styles.segment} children={props.children} />
)

const Text = (props: { children: ReactNode; style?: StyleProp<TextStyle> }) => {
  return (
    <RNText numberOfLines={1} style={[styles.text, props.style]}>
      {props.children}
    </RNText>
  )
}

const Event = (props: EventProps) => {
  const SportTime = () => (
    <Segment>
      <Text style={styles.sport}>{CFL(props.sport)}</Text>
      <HSpacer w={10} />
      <Text style={styles.completedTime}>{props.start}</Text>
      <HSpacer w={10} />
      <Feather
        name="check"
        size={18}
        color={colors.emerald[500]}
        style={{ paddingTop: 3, display: props.completed ? 'flex' : 'none' }}
      />
    </Segment>
  )

  const VenueCourt = () => (
    <Segment>
      <Text style={styles.venue}>{props.venue}</Text>
      <HSpacer w={8} />
      <Text style={styles.court}>{props.court}</Text>
    </Segment>
  )

  const Round = () => (
    <Segment>
      <Text style={styles.round}>{prettify(props.round)}</Text>
    </Segment>
  )

  const Participant = (props: {
    teamName: string
    style: StyleProp<TextStyle>
  }) => {
    return (
      <View style={styles.participantContainer}>
        <Text style={[styles.participants, props.style]}>
          {prettify(props.teamName)}
        </Text>
      </View>
    )
  }

  const Score = (score: {
    style: StyleProp<ViewStyle>
    score: number
    win: boolean
  }) => {
    const style: StyleProp<TextStyle>[] = [styles.score]
    if (score.win) {
      style.push(styles.win)
    }
    style.push
    return props.completed ? (
      <View style={[styles.scoreContainer, score.style]}>
        <Text style={style}>{score.score}</Text>
      </View>
    ) : null
  }

  const Participants = () => (
    <Segment>
      <View style={styles.bothParticipantsContainer}>
        <Participant teamName={props.A} style={styles.textRight} />
        <Text style={styles.vs}>{'v'}</Text>
        <Participant teamName={props.B} style={styles.textLeft} />
      </View>
    </Segment>
  )

  return (
    <View style={styles.eventBg}>
      <SportTime />
      <VenueCourt />
      <Round />
      <Participants />
      <View style={styles.scoreWrapper}>
        <Score
          score={props.scoreA}
          style={styles.left}
          win={props.scoreA > props.scoreB}
        />
        <View style={{flex: 1}}/>
        <Score
          score={props.scoreB}
          style={styles.right}
          win={props.scoreA < props.scoreB}
        />
      </View>
    </View>
  )
}

export default Event
