import { Text, View, TouchableOpacity } from 'react-native'
import { picker as styles } from '@/styles/fresh'
import Picker from 'react-native-picker-select'
import { MutableRefObject } from 'react'

const CustomPicker = ({
  pickerRef,
  display,
}: {
  pickerRef: MutableRefObject<Picker | null>
  display: any
}) => {
  function openPicker() {
    pickerRef.current?.togglePicker()
  }
  return (
    <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}>
      <View style={styles.pickerTextContainer}>
        <Text style={styles.pickerText}>{display}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomPicker
