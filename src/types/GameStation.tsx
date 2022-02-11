export type GameStation = {
  id: number
  name: string
  description: string
  icon: () => JSX.Element
  coordinate: {
    latitude: number
    longitude: number
  }
  type: string
  stage: number
}
