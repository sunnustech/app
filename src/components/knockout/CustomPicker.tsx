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
  const prettyText = (display: string | number): string | number => {
    if (typeof display === 'number') {
      return display
    }
    const spaced = replaceUnderscoresWithSpaces(display)
    const dashed = spaced !== '' ? spaced : '---'
    return dashed
  }
  return (
    <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}>
      <View style={styles.pickerTextContainer}>
        <Text style={styles.pickerText}>{prettyText(display)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomPicker
