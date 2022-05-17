import { globalStyles } from '@/styles/global'
import { MapButtonProps } from '@/types/SOAR'
import { Text, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { StyleSheet } from 'react-native'
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons'
import { OnPress } from '@/types/index'

const styles = globalStyles.button.map

const flatten = StyleSheet.flatten

/**
 * all buttons extends this base entity
 */
const MapBaseButton = (props: MapButtonProps) => {
  /**
   * compute the styles based on props.style and props.size
   * props.size affects the radius of the base circle of the
   * map button
   */
  const styleArr = [styles.base, props.style]
  if (props.size) {
    styleArr.push({ width: props.size, height: props.size })
  }
  const _style = flatten(styleArr)
  /**
   * buttons can only have one of two Children:
   *  1. an icon
   *  2. an actual react child
   */
  const Children = () => {
    if (props.type === 'icon') {
      const [IconProvider, name, color] = props.icon ? props.icon : []
      return (
        <IconProvider
          name={name}
          color={color ? color : colors.gray[700]}
          size={24}
        />
      )
    }
    return props.children
  }
  /**
   * return the inner child wrapped with a TouchableOpacity
   */
  return (
    <TouchableOpacity style={_style} onPress={props.onPress}>
      <Children />
    </TouchableOpacity>
  )
}

/**
 * This is a secondary base button:
 * Buttons that are meant to be at the bottom of the map screen
 * Think: QR button, the blue button to jump back to school, ...
 */
const MapBottomButton = (props: MapButtonProps) => {
  const _style = flatten([styles.bottomButton, props.style])
  return <MapBaseButton {...props} style={_style} />
}

/** the real exported buttons */
export namespace Buttons {
  export const Back = (props: { onPress: OnPress }) => (
    <MapBaseButton
      type="icon"
      icon={[Ionicons, 'chevron-back']}
      onPress={props.onPress}
      size={48}
    />
  )
  export const SOS = (props: { onPress: OnPress }) => (
    <MapBottomButton
      type="icon"
      icon={[Fontisto, 'asterisk', colors.red[500]]}
      onPress={props.onPress}
    />
  )
  export const GoToSchool = (props: { onPress: OnPress }) => (
    <MapBottomButton
      type="child"
      style={{ backgroundColor: colors.blue[400] }}
      onPress={props.onPress}
    >
      <Text style={styles.whiteText}>NUS</Text>
    </MapBottomButton>
  )
  export const QR = (props: { onPress: OnPress }) => (
    <MapBottomButton
      type="icon"
      icon={[MaterialIcons, 'qr-code']}
      onPress={props.onPress}
    />
  )
}

export default MapBaseButton
