import { mapButtons as styles } from '@/styles/fresh'
import { MapButtonProps } from '@/types/SOAR'
import { Text, TouchableOpacity } from 'react-native'
import colors from '@/styles/colors'
import { StyleSheet } from 'react-native'
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons'

const flatten = StyleSheet.flatten

const MapBaseButton = ({
  icon,
  onPress,
  style,
  size,
  children,
}: MapButtonProps) => {
  const styleArr = [styles.mapSideButton, style]
  if (size) {
    styleArr.push({ width: size, height: size })
  }
  const _style = flatten(styleArr)
  // icon: provider + name
  const [IconProvider, name, color] = icon ? icon : []
  return true ? (
    <TouchableOpacity style={_style} onPress={onPress}>
      {icon ? (
        <IconProvider
          name={name}
          color={color ? color : colors.gray[700]}
          size={24}
        />
      ) : null}
      {children ? children : null}
    </TouchableOpacity>
  ) : null
}

const MapBottomButton = (props: MapButtonProps) => {
  const _style = flatten([styles.mapBottomButton, props.style])
  return <MapBaseButton {...props} style={_style} />
}

export namespace Buttons {
  export const Back = ({ onPress }: any) => (
    <MapBaseButton
      icon={[Ionicons, 'chevron-back']}
      onPress={onPress}
      size={48}
    />
  )
  export const SOS = ({ onPress }: any) => (
    <MapBottomButton
      icon={[Fontisto, 'asterisk', colors.red[500]]}
      onPress={onPress}
    />
  )
  export const GoToSchool = ({ onPress }: any) => (
    <MapBottomButton style={styles.mapGoToSchoolButton} onPress={onPress}>
      <Text style={styles.mapGoToSchoolText}>NUS</Text>
    </MapBottomButton>
  )
  export const QR = ({ onPress }: any) => (
    <MapBottomButton icon={[MaterialIcons, 'qr-code']} onPress={onPress} />
  )
}

export default MapBaseButton
