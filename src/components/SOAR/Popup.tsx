import { Text, View } from 'react-native'

const Popup = ({ content }: any) => {
  return (
    <View>
      <Text>{content.game_title}</Text>
      <Text>{content.details}</Text>
    </View>
  )
}

export default Popup
