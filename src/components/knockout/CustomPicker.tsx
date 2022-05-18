import { Text, TouchableOpacity } from 'react-native'
import { globalStyles } from '@/styles/global'
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
    <TouchableOpacity
      onPress={openPicker}
      style={globalStyles.picker.pickerContainer}
    >
      <Text style={globalStyles.picker.pickerText}>{prettyText(display)}</Text>
    </TouchableOpacity>
  )
}

export default CustomPicker
