export type Color =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

type ColorGroup = Record<Shade, string>

export type BaseColors = Record<Color, ColorGroup> & {
  transparent: string
  black: string
  white: string
}

export type AddedColors = {
  shadow: string
  bg: string
  fg: string
  homeFg: string

}

export type AllColors = BaseColors & AddedColors
