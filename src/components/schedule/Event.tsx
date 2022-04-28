import { View, Text as RNText, StyleProp, TextStyle } from 'react-native'
import { schedule as styles } from '@/styles/fresh'
import { EventProps } from '@/types/schedule'
import {
  replaceUnderscoresWithSpaces as RU,
  capitalizeFirstLetters as CFL,
} from '@/lib/utils'
import { ReactNode } from 'react'

const prettify = (s: string) => CFL(RU(s))

const Text = ({
  children,
  style,
}: {
  children: ReactNode
  style?: StyleProp<TextStyle>
}) => {
  return <RNText style={[styles.text, style]}>{children}</RNText>
}

const NotCompleted = (props: EventProps) => {
  const round = prettify(props.round)
  const sport = CFL(props.sport)
  const A = prettify(props.A)
  const B = prettify(props.B)
  return (
    <View style={styles.eventBg}>
      <Text style={styles.time}>{props.start}</Text>
      <Text style={styles.sport}>{sport}</Text>
      <RNText style={{ marginBottom: 4 }}>
        <Text style={styles.venue}>{props.venue}</Text>
        {'  '}
        <Text style={styles.court}>{props.court}</Text>
      </RNText>
      <Text style={styles.round}>{round}</Text>
      <RNText style={{ marginBottom: 2 }}>
        <Text style={styles.participants}>{A}</Text>
        <Text style={styles.vs}>{'  v  '}</Text>
        <Text style={styles.participants}>{B}</Text>
      </RNText>
    </View>
  )
}

const Completed = (props: EventProps) => {
  const round = prettify(props.round)
  const sport = CFL(props.sport)
  const A = prettify(props.A)
  const B = prettify(props.B)
  return (
    <View style={styles.eventBg}>
      <Text style={styles.completedTime}>{props.start}</Text>
      <Text style={styles.sport}>{sport}</Text>
      <RNText style={{ marginBottom: 4 }}>
        <Text style={styles.venue}>{props.venue}</Text>
        {'  '}
        <Text style={styles.court}>{props.court}</Text>
      </RNText>
      <Text style={styles.round}>{round}</Text>
      <RNText style={{ marginBottom: 2 }}>
        <Text style={styles.participants}>{A}</Text>
        <Text style={styles.vs}>{'  v  '}</Text>
        <Text style={styles.participants}>{B}</Text>
      </RNText>
    </View>
  )
}

const Event = (props: EventProps) => {
  const completed = props.completed
  console.log(completed)
  return completed ? <Completed {...props} /> : <NotCompleted {...props} />
}

export default Event
