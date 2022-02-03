import { Fontisto as FO, FontAwesome5 as FA } from '@expo/vector-icons'

export const islandLocations = [
  {
    name: 'Game Station 1',
    description:
      'So you have pressed the pin. Press anywhere on this callout to navigate to the Notification Screen.',
    icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
    coordinate: {
      latitude: 1.258,
      longitude: 103.82,
    },
    type: 'game',
    stage: 0,
  },
  {
    name: 'Game Station 2',
    description:
      'Supreme Leader Hong Sheng has casually destroyed his opponents',
    icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
    coordinate: {
      latitude: 1.257,
      longitude: 103.82,
    },
    type: 'game',
    stage: 1,
  },
  {
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
