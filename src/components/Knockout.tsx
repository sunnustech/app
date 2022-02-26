import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import tw from 'twrnc'

const MatchNode = ({ text, styleProps }: { text: string; styleProps: any }) => {
  return (
    <TouchableOpacity
      style={styles.matchNode(styleProps)}
      // style={tw`flex flex-row justify-center items-center h-10 w-36 p-2 border mx-3 my-${gap}`}
    >
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
    <View style={tw`flex flex-col justify-center ${color}`}>
      <View>
        {[...Array(nodes).keys()].map((e, i) => (
          <MatchNode text={e.toString()} key={i} styleProps={styleProps} />
        ))}
      </View>
    </View>
  )
}

const Columns = () => {
  const styleProps = {
    height: 30,
    gap: 4,
  }
  return (
    <>
      <MatchColumn color="bg-red-100" nodes={16} styleProps={styleProps} />
      <MatchColumn color="bg-orange-100" nodes={8} styleProps={styleProps} />
      <MatchColumn color="bg-yellow-100" nodes={4} styleProps={styleProps} />
      <MatchColumn color="bg-green-100" nodes={2} styleProps={styleProps} />
      <MatchColumn color="bg-blue-100" nodes={1} styleProps={styleProps} />
    </>
  )
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
    padding: 2,
    marginHorizontal: 8,
    marginVertical: gap,
    borderStyle: 'solid',
    borderWidth: 1,
  }),
})

export { Knockout }
