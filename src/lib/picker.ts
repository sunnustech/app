import { utils as styles } from '@/styles/fresh'
import { Item } from 'react-native-picker-select'
import { Round, Sport } from '@/types/TSS'
import { replaceUnderscoresWithSpaces } from '@/lib/utils'

export function getPickerItems(
  arr: Array<string | number | Sport | Round>
): Array<Item> {
  return arr.map((e, i) => {
    const string = e.toString()
    return {
      label: replaceUnderscoresWithSpaces(string),
      value: string,
      key: i,
    }
  })
}

export const showNone = {
  placeholder: styles.displayNone,
  inputAndroid: styles.displayNone,
  inputAndroidContainer: styles.displayNone,
  inputIOS: styles.displayNone,
  inputIOSContainer: styles.displayNone,
  inputWeb: styles.displayNone,
}
