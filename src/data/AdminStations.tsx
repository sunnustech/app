import { Fontisto as FO, FontAwesome5 as FA } from '@expo/vector-icons'

export const adminLocations = [
  {
    id: 3,
    name: 'Admin Booth',
    description: 'Just a tag to differentiate game stations',
    icon: () => <FA name="umbrella-beach" size={42} color="#22c55e" />,
    coordinate: {
      latitude: 1.25,
      longitude: 103.82,
    },
    type: 'admin',
  },
]
