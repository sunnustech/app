import { Color, SvgXml, XmlProps } from 'react-native-svg'
import sunnus from './sunnus-svg'
import soar from './soar-svg'
import tss from './tss-svg'
import wss from './wss-svg'
import GemSvg from './gem-svg'
import { View } from 'react-native'

const GeneralSvg = (
  props: { src: (color: Color) => string } & Pick<XmlProps, 'fill' | 'opacity'>
) => (
  <SvgXml
    xml={props.src(props.fill || 'black')}
    height="100%"
    width="100%"
    opacity={props.opacity}
  />
)

const SunnusSvg = (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
  <GeneralSvg src={sunnus} {...props} />
)
const SOARSvg = (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
  <GeneralSvg src={soar} {...props} />
)
const TSSSvg = (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
  <GeneralSvg src={tss} {...props} />
)
const WSSSvg = (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
  <GeneralSvg src={wss} {...props} />
)

export const Gem = (props: { size?: number }) => {
  const height = props.size || 36
  const ratio = 1.315
  return (
    <View style={{ height, width: height * ratio }}>
      <GemSvg />
    </View>
  )
}

export { SunnusSvg, SOARSvg, TSSSvg, WSSSvg }
