import { mapButtons as styles } from '@/styles/fresh'
import { MapButtonProps } from '@/types/SOAR'
import { Text, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { StyleSheet } from 'react-native'
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons'

const flatten = StyleSheet.flatten

/**
 * all buttons extends this base entity
 */
const MapBaseButton = (props: MapButtonProps) => {
  const styleArr = [styles.base, props.style]
  if (props.size) {
    styleArr.push({ width: props.size, height: props.size })
  }
  const _style = flatten(styleArr)
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
  return (
    <TouchableOpacity style={_style} onPress={props.onPress}>
      <Children />
    </TouchableOpacity>
  )
}

const MapBottomButton = (props: MapButtonProps) => {
  const _style = flatten([styles.bottomButton, props.style])
  return <MapBaseButton {...props} style={_style} />
}

export namespace Buttons {
  export const Back = ({ onPress }: any) => (
    <MapBaseButton
      type="icon"
      icon={[Ionicons, 'chevron-back']}
      onPress={onPress}
      size={48}
    />
  )
  export const SOS = ({ onPress }: any) => (
    <MapBottomButton
      type="icon"
      icon={[Fontisto, 'asterisk', colors.red[500]]}
      onPress={onPress}
    />
  )
  export const GoToSchool = ({ onPress }: any) => (
    <MapBottomButton
      type="child"
      style={styles.blue}
      onPress={onPress}
    >
      <Text style={styles.whiteText}>NUS</Text>
    </MapBottomButton>
  )
  export const QR = ({ onPress }: any) => (
    <MapBottomButton
      type="icon"
      icon={[MaterialIcons, 'qr-code']}
      onPress={onPress}
    />
  )
}

export default MapBaseButton
