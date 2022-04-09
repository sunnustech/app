import { Dispatch } from 'react'
import RNPickerSelect, { Item } from 'react-native-picker-select'
import { UseState } from '@/types/SOAR'

const CustomPicker = ({
  _ref,
  display,
  setState,
  items,
}: {
  _ref: any
  display: UseState<any>
  setState: Dispatch<any>
  items: Array<Item>
}) => {
  return (
    <RNPickerSelect
      ref={_ref}
      value={display[0]}
      placeholder={{}}
      onValueChange={(value) => display[1](value)}
      onDonePress={() => setState(display[0])}
      items={items}
    />
  )
}

export default CustomPicker
