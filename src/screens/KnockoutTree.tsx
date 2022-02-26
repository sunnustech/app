// imports {{{
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* sunnus components */
import { Button, ButtonGreen, ButtonRed } from '@/components/Buttons'
import styles from '@/styles/main'
import { delimiter, getKnockoutTree } from '@/lib/knockout'
import TSS from '@/data/schema/TSS'
import { Sport } from '@/data/schema/TSS.d'
import { MatchRequest, Round } from '@/types/TSS.d'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from 'twrnc'
// }}}

const MatchNode = ({ text, gap }: { text: string; gap: number }) => {
  return (
    <TouchableOpacity
      style={tw`flex flex-row justify-center items-center h-10 w-36 p-2 border mx-3 my-${gap}`}
    >
      <Text>{`A vs. B ${text}`}</Text>
    </TouchableOpacity>
  )
}

const MatchColumn = ({
  nodes,
  color,
  gap = 0,
}: {
  nodes: number
  color: string
  gap?: number
}) => {
  return (
    <View style={tw`flex flex-col justify-center ${color}`}>
      <View>
        {[...Array(nodes).keys()].map((e, i) => (
          <MatchNode text={e.toString()} key={i} gap={gap} />
        ))}
      </View>
    </View>
  )
}

const Column = ({ children }: { children: any }) => {
  return <View style={tw`flex flex-col justify-center`}>{children}</View>
}

const Knockout = () => {
  return (
    <ScrollView
      style={tw`w-full`}
      horizontal={true}
      directionalLockEnabled={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row`}>
          <MatchColumn color="bg-red-100" nodes={16} gap={2} />
          <MatchColumn color="bg-orange-100" nodes={8} gap={9} />
          <MatchColumn color="bg-yellow-100" nodes={4} gap={23} />
          <MatchColumn color="bg-green-100" nodes={2} gap={51} />
          <MatchColumn color="bg-blue-100" nodes={1} gap={0} />
        </View>
      </ScrollView>
    </ScrollView>
  )
}

const KnockoutTree = () => {
  const [sport, setSport] = useState<Sport>('volleyball')

  function debugKnockoutTree({ sport }: { sport: Sport }) {
    getKnockoutTree({ sport }).then((data: any) => {
      delimiter()
      console.log(sport, data)
      delimiter()
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>The one place for knockout tree development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={() => debugKnockoutTree({ sport })}>
          Debug Table
        </ButtonGreen>
      </View>
      <Knockout />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTree
