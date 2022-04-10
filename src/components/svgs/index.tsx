import { Color, SvgXml, XmlProps } from 'react-native-svg'
import sunnus from './sunnus-svg'
import soar from './soar-svg'
import tss from './tss-svg'
import wss from './wss-svg'

const GeneralSvg = (
  props: { src: (color: Color) => string } & Pick<XmlProps, 'fill' | 'opacity'>
) => (
  <SvgXml
    xml={props.src(props.fill || 'black')}
    height="100%`"
    width="100%"
    opacity={props.opacity}
  />
)

const Svgs = {
  Sunnus: (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
    <GeneralSvg src={sunnus} {...props} />
  ),
  SOAR: (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
    <GeneralSvg src={soar} {...props} />
  ),
  TSS: (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
    <GeneralSvg src={tss} {...props} />
  ),
  WSS: (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
    <GeneralSvg src={wss} {...props} />
  ),
}

export default Svgs
