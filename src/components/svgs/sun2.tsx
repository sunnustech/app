import { Color, SvgXml, XmlProps } from 'react-native-svg'

const sunnus = (color: Color): string => {
  return `
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 891 120"
    version="1.1"
    fill='${color}'
    xml:space="preserve"
    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
  >
    <g transform="matrix(1.75446,0,0,1.75446,-667.82,-854.179)">
      <g transform="matrix(113.995,0,0,113.995,386,545)">
        <path
          d="M0.667,-0.011L0.568,-0.011L0.552,0.089L-0.046,0.089L-0.03,-0.009L0.468,-0.009L0.484,-0.107L0.083,-0.107L0.098,-0.207L0.001,-0.207L0.033,-0.411L0.131,-0.411L0.146,-0.509L0.647,-0.509L0.632,-0.413L0.731,-0.413L0.715,-0.311L0.516,-0.311L0.531,-0.406L0.232,-0.406L0.202,-0.214L0.6,-0.214L0.585,-0.113L0.683,-0.113L0.667,-0.011Z"
          style="fill-rule:nonzero;"
        />
      </g>
      <g transform="matrix(113.995,0,0,113.995,472.181,545)">
        <path
          d="M0.559,0.089L0.36,0.089L0.375,-0.007L0.279,-0.007L0.264,0.089L0.062,0.089L0.077,-0.007L-0.023,-0.007L0.041,-0.409L0.238,-0.4090.175,-0.012L0.273,-0.012L0.288,-0.109L0.391,-0.109L0.438,-0.409L0.638,-0.409L0.559,0.089Z"
          style="fill-rule:nonzero;"
        />
      </g>
      <g transform="matrix(113.995,0,0,113.995,549.925,545)">
        <path
          d="M0.559,0.089L0.362,0.089L0.425,-0.308L0.227,-0.308L0.164,0.089L-0.038,0.089L0.041,-0.409L0.538,-0.409L0.523,-0.315L0.623,-0.315L0.559,0.089Z"
          style="fill-rule:nonzero;"
        />
      </g>
      <g transform="matrix(113.995,0,0,113.995,627.556,545)">
        <path
          d="M0.651,0.089L0.452,0.089L0.467,-0.007L0.369,-0.007L0.385,-0.107L0.285,-0.107L0.301,-0.206L0.2,-0.206L0.154,0.089L-0.046,0.089L0.049,-0.509L0.248,-0.509L0.233,-0.413L0.331,-0.413L0.315,-0.313L0.415,-0.313L0.399,-0.214L0.5,-0.214L0.546,-0.509L0.746,-0.509L0.651,0.089Z"
          style="fill-rule:nonzero;"
        />
      </g>
      <g transform="matrix(113.995,0,0,113.995,716.245,545)">
        <path
          d="M0.667,-0.01L0.572,-0.01L0.556,0.089L0.054,0.089L0.069,-0.008L-0.031,-0.008L0.049,-0.509L0.246,-0.509L0.167,-0.012L0.465,-0.012L0.544,-0.509L0.746,-0.509L0.667,-0.01Z"
          style="fill-rule:nonzero;"
        />
      </g>
      <g transform="matrix(113.995,0,0,113.995,805.047,545)">
        <path
          d="M0.667,-0.011L0.568,-0.011L0.552,0.089L-0.046,0.089L-0.03,-0.009L0.468,-0.009L0.484,-0.107L0.083,-0.107L0.098,-0.207L0.001,-0.207L0.033,-0.411L0.131,-0.411L0.146,-0.509L0.647,-0.509L0.632,-0.413L0.731,-0.413L0.715,-0.311L0.516,-0.311L0.531,-0.406L0.232,-0.406L0.202,-0.214L0.6,-0.214L0.585,-0.113L0.683,-0.113L0.667,-0.011Z"
          style="fill-rule:nonzero;"
        />
      </g>
    </g>
  </svg>
  `
}

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

export default Sunnus
