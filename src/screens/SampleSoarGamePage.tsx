import { SoarContext } from '@/contexts/SoarContext'
import { useContext } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../components/Buttons'

const SampleSoarGamePage = () => {
  const { updateFilterLocations, gameLocations, updateGameLocations } =
    useContext(SoarContext)

  return (
    <View>
      <Text>Supreme Leader Hong Sheng very handsome I shy...</Text>
      <Button
        onPress={() => {
          const nextStage = 0
          updateGameLocations(
            gameLocations.filter((e) => e.stage === nextStage)
          )
          updateFilterLocations(
            gameLocations.filter((e) => e.stage === nextStage)
          )
        }}
      >
        Update Stage 0
      </Button>
      <Button
        onPress={() => {
          const nextStage = 1
          updateGameLocations(
            gameLocations.filter((e) => e.stage === nextStage)
          )
          updateFilterLocations(
            gameLocations.filter((e) => e.stage === nextStage)
          )
        }}
      >
        Update Stage 1
      </Button>
    </View>
  )
}

export default SampleSoarGamePage
