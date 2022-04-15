import { Dispatch } from 'react'
import RNPickerSelect, { Item } from 'react-native-picker-select'
import { UseState } from '@/types/SOAR'
import { showNone } from '@/lib/utils'

const PickerProvider = ({
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
  const setDisplay = display[1]
  return (
    <RNPickerSelect
      ref={_ref}
      value={display[0]}
      placeholder={{}}
      style={showNone}
      onValueChange={(value) => setDisplay(value)}
      onDonePress={() => setState(display[0])}
      items={items}
    />
  )
}

export default PickerProvider
