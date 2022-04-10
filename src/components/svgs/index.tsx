import { Color, SvgXml, XmlProps } from 'react-native-svg'
import sunnus from './sunnus'

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

const Sunnus = (props: Pick<XmlProps, 'fill' | 'opacity'>) => (
  <GeneralSvg src={sunnus} {...props} />
)

export {Sunnus}
export default Sunnus
