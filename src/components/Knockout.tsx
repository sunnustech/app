import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'

const MatchNode = ({ text, styleProps }: { text: string; styleProps: any }) => {
  return (
    <TouchableOpacity style={styles.matchNode(styleProps)}>
      <Text>{`A vs. B ${text}`}</Text>
    </TouchableOpacity>
  )
}

const MatchColumn = ({
  styleProps,
  nodes,
  color,
}: {
  nodes: number
  styleProps: any
  color: string
}) => {
  return (
    <View style={styles.matchColumn({ color })}>
      <View>
        {[...Array(nodes).keys()].map((e, i) => (
          <MatchNode text={e.toString()} key={i} styleProps={styleProps} />
        ))}
      </View>
    </View>
  )
}

const Columns = () => {
  const gaps = []
  const height = 10
  const gap = 4
  const columns = 5
  for (let i = 0; i < columns - 1; i++) {
    const nodes = 2 ** (columns - i - 1)
    const n = 2 ** i
    const thisGap = (n * gap + (n - 1) * height) / 1
    gaps.push({ gap: thisGap, nodes })
  }
  gaps.push({ gap: 0, nodes: 1 })
  console.log('got here', gaps, height)

  return (
    <>
      {gaps.map((e) => (
        <MatchColumn
          color="#fee2e2"
          nodes={e.nodes}
          styleProps={{ gap: e.gap, height }}
        />
      ))}
    </>
  )
  // <MatchColumn color="#fee2e2" nodes={16} styleProps={styleProps}
  // <MatchColumn color="#ffedd5" nodes={8} styleProps={styleProps}
  // <MatchColumn color="#fef9c3" nodes={4} styleProps={styleProps}
  // <MatchColumn color="#dcfce7" nodes={2} styleProps={styleProps}
  // <MatchColumn color="#dbeafe" nodes={1} styleProps={styleProps}
}

const Knockout = () => {
  return (
    <ScrollView
      style={styles.horizontal}
      horizontal={true}
      directionalLockEnabled={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.vertical}>
          <Columns />
        </View>
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    marginTop: 10,
  },
  vertical: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  matchNode: ({ gap, height }: { gap: number; height: number }) => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: 100,
    padding: 0,
    marginHorizontal: 8,
    marginVertical: gap,
    borderStyle: 'solid',
    borderWidth: 10,
  }),
  matchColumn: ({ color }: { color: string }) => ({
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color,
  }),
})

export { Knockout }
