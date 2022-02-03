import { SoarContext } from '@/sunnus/App'
import { useContext } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../components/Buttons'

const SampleSoarGamePage = () => {
  const { stage, updateStage } = useContext(SoarContext)

  return (
    <View>
      <Text>Supreme Leader Hong Sheng very handsome I shy...</Text>
      <Button onPress={() => updateStage(1)}>
        Map SOAR test button
      </Button>
    </View>
  )
}

export default SampleSoarGamePage
