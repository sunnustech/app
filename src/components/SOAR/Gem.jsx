import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'

const Gem = (props) => (
  <Svg
    viewBox="0 -8 45 43"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    {...props}
  >
    <Path
      d="m4 15.03 6.894-8.86h23.304l6.798 8.86-18.45 19.374L4 15.03Z"
      style={{
        fill: 'url(#a)',
        fillRule: 'nonzero',
      }}
    />
    <Path
      d="M22.405 8.108 10.819 6.167l1.719 11.683h19.731l1.719-11.683-11.583 1.941Z"
      style={{
        fill: '#fff',
        fillOpacity: 0.44,
        fillRule: 'nonzero',
      }}
    />
    <Path
      d="m10.819 6.167 11.728 3.894 11.651-3.89-23.379-.004Z"
      style={{
        fill: '#fff',
        fillOpacity: 0.5,
        fillRule: 'nonzero',
      }}
    />
    <Path
      d="M12.538 17.85 4 15.03l6.819-8.863h1.719V17.85ZM32.269 17.85 41 15.03l-6.819-8.863h-1.72l-.192 11.683Z"
      style={{
        fill: '#fff',
        fillOpacity: 0.33,
        fillRule: 'nonzero',
      }}
    />
    <Path
      d="m12.538 17.85 9.959 16.529 9.771-16.529h-19.73ZM22.404 8.108l-9.866 9.741h19.73l-9.864-9.741Z"
      style={{
        fill: '#fff',
        fillOpacity: 0.22,
        fillRule: 'nonzero',
      }}
    />
    <Path
      d="m22.546 10.061-10.008 7.788h19.73l-9.722-7.788Z"
      style={{
        fill: '#fff',
        fillOpacity: 0.1,
        fillRule: 'nonzero',
      }}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(90 8.164 14.334) scale(28.2339)"
      >
        <Stop
          offset={0}
          style={{
            stopColor: '#ff5c00',
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={0.43}
          style={{
            stopColor: '#ff375f',
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={1}
          style={{
            stopColor: '#ff5c00',
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default Gem
