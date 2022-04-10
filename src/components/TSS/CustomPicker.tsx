import { Text, View, TouchableOpacity } from 'react-native'
import { picker as styles } from '@/styles/fresh'
import Picker from 'react-native-picker-select'
import { MutableRefObject } from 'react'
import { replaceUnderscoresWithSpaces } from '@/lib/utils'

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
  const prettyText = replaceUnderscoresWithSpaces(display)
  return (
    <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}>
      <View style={styles.pickerTextContainer}>
        <Text style={styles.pickerText}>{prettyText}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomPicker
