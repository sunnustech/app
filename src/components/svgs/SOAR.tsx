import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 617 120"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <Path
        d="M.667-.011H.568l-.016.1h-.598l.016-.098h.498l.016-.098H.083l.015-.1H.001l.032-.204h.098l.015-.098h.501l-.015.096h.099l-.016.102H.516l.015-.095H.232l-.03.192H.6l-.015.101h.098l-.016.102z"
        transform="translate(-667.82 -854.179) scale(1.75446) translate(386 545) scale(113.995)"
        fillRule="nonzero"
      />
      <Path
        d="M.683-.111H.585l-.016.102H.472L.456.089H.052l.015-.098H-.03l.047-.3h.098l.016-.102h.097l.016-.098h.404l-.015.098H.73l-.047.3zm-.2 0L.53-.409H.328l-.016.1H.217L.17-.011h.202l.016-.1h.095z"
        transform="translate(-667.82 -854.179) scale(1.75446) translate(472.181 545) scale(113.995)"
        fillRule="nonzero"
      />
      <Path
        d="M.651.089H.454l.031-.198H.188L.156.089h-.202l.063-.4h.096l.015-.1h.1l.016-.098h.302L.53-.411h.1l-.015.1h.1l-.064.4zm-.152-.3l.016-.1h-.1L.43-.409H.328l-.016.098H.217l-.015.1h.297z"
        transform="translate(-667.82 -854.179) scale(1.75446) translate(560.071 545) scale(113.995)"
        fillRule="nonzero"
      />
      <Path
        d="M.699-.211H.601L.585-.11h-.1L.47-.013h.197L.651.089H.354l.015-.096h-.1L.286-.11H.188L.156.089h-.202l.095-.598h.599l-.015.096h.098l-.032.202zm-.2 0L.53-.409H.233l-.031.198h.297z"
        transform="translate(-667.82 -854.179) scale(1.75446) translate(648.873 545) scale(113.995)"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default SvgComponent
