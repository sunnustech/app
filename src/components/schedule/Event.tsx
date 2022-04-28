import { View, Text as RNText, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { schedule as styles } from '@/styles/fresh'
import { EventProps } from '@/types/schedule'
import { Feather } from '@expo/vector-icons'
import {
  replaceUnderscoresWithSpaces as RU,
  capitalizeFirstLetters as CFL,
} from '@/lib/utils'
import { ReactNode } from 'react'
import colors from '@/styles/colors'

const prettify = (s: string) => CFL(RU(s))

const HSpacer = (props: { width: number }) => (
  <View style={{ width: props.width }} />
)

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
      <HSpacer width={10} />
      <Text style={styles.completedTime}>{props.start}</Text>
      <HSpacer width={10} />
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
      <HSpacer width={8} />
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

  const Score = (props: {
    style: StyleProp<ViewStyle>
    score: number
    win: boolean
  }) => {
    const style: StyleProp<TextStyle>[] = [styles.score]
    if (props.win) {
      style.push(styles.win)
    }
    style.push
    return (
      <View style={[styles.scoreContainer, props.style]}>
        <Text style={style}>{props.score}</Text>
      </View>
    )
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
      <Score
        score={props.scoreA}
        style={styles.left}
        win={props.scoreA > props.scoreB}
      />
      <Score
        score={props.scoreB}
        style={styles.right}
        win={props.scoreA < props.scoreB}
      />
    </View>
  )
}

export default Event
