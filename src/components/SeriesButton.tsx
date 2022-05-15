import { TouchableOpacity, View, ViewProps } from 'react-native'
import { OnPress } from '@/types/index'
import { Color } from '@/types/colors'
import { ReactElement } from 'react'
import { makeAccent } from '@/styles/utils'
import { globalStyles } from '../styles/global'

type SvgProps = (props: { fill: string }) => ReactElement

const SeriesButton = (
  props: ViewProps & { color: Color; onPress: OnPress; svg: SvgProps }
) => {
  const accent = makeAccent(props.color)

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        globalStyles.button.series.base,
        {
          backgroundColor: accent.bg,
          borderColor: accent.border,
        },
      ]}
    >
      <View style={globalStyles.container.series}>
        <props.svg fill={accent.fg} />
      </View>
    </TouchableOpacity>
  )
}

export default SeriesButton
