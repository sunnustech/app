import { default as RNToast } from 'react-native-root-toast'
import { utils as styles } from '@/styles/fresh'
import { Item } from 'react-native-picker-select'
import { Round, Sport } from '../types/TSS'

// shows a 2-second small notif at the bottom of the screen
export function Toast(string: string) {
  RNToast.show(string, {
    duration: 2000,
    opacity: 0.7,
  })
}

export function capitalizeFirstLettersAndJoin(string: string) {
  var separateWord = string.split(' ')
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1)
  }
  return separateWord.join('')
}

export function replaceUnderscoresWithSpaces(string: string) {
  if (!string) {
    return ''
  }
  return string.replace(/_/g, ' ')
}

export function objFromArray(
  arr: Array<{ [key: string]: any }>,
  identifierKey: string
) {
  const obj: any = {}
  arr.forEach((e) => {
    obj[e[identifierKey]] = e
  })
  return obj
}

export function getItems(
  arr: Array<string | number | Sport | Round>
): Array<Item> {
  return arr.map((e, i) => {
    const s = e.toString ? e.toString() : '---'
    return {
      label: replaceUnderscoresWithSpaces(s),
      value: s,
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
