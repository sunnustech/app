import { Color, SvgXml, XmlProps } from 'react-native-svg'
import sunnus from './sunnus-svg'
import soar from './soar-svg'
import tss from './tss-svg'
import wss from './wss-svg'
import gem from './gem-svg'

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

const GemSvg = gem

export { SunnusSvg, SOARSvg, TSSSvg, WSSSvg, GemSvg }
