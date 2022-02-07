import { SoarContext } from '@/sunnus/App'
import { useContext } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../components/Buttons'
import { gameLocations } from '../data/GameStations'

const SampleSoarGamePage = () => {
  const { filterLocations, updateFilterLocations } = useContext(SoarContext)

  return (
    <View>
      <Text>Supreme Leader Hong Sheng very handsome I shy...</Text>
      <Button onPress={() => {
        const nextStage = 0
        updateFilterLocations(gameLocations.filter((e) => e.stage === nextStage))
      }}>Update Stage 0</Button>
      <Button onPress={() => {
        const nextStage = 1
        updateFilterLocations(gameLocations.filter((e) => e.stage === nextStage))
      }}>Update Stage 1</Button>
    </View>
  )
}

export default SampleSoarGamePage
// filterLocations be part of globalcontext
// useEffect on Map Screen 