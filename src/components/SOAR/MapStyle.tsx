/* reference:
 * https://mapstyle.withgoogle.com
 * once done styling, click "finish" and copy the resulting json here
 */

import colors from '@/styles/colors'
import { Color } from '@/types/colors'

const accent: Color = 'zinc'

const theme = {
  AA: colors[accent][50],
  BB: colors[accent][100],
  CC: colors[accent][200],
  DD: colors[accent][300],
  EE: colors[accent][400],
  FF: colors[accent][500],
  GG: colors[accent][500],
  HH: colors[accent][500],
  II: colors[accent][500],
  JJ: colors[accent][500],
}

// const original = {
//   AA: '#ffffff',
//   BB: '#f5f5f5',
//   CC: '#eeeeee',
//   DD: '#e5e5e5',
//   EE: '#dadada',
//   FF: '#c9c9c9',
//   GG: '#bdbdbd',
//   HH: '#9e9e9e',
//   II: '#757575',
//   JJ: '#616161',
// }

export const customMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: theme.BB,
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.JJ,
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: theme.BB,
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.GG,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.CC,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.II,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.DD,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.HH,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.AA,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.II,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.EE,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.JJ,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.HH,
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.DD,
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.CC,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: theme.FF,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: theme.HH,
      },
    ],
  },
]
