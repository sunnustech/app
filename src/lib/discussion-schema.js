const participants = [
  {
    group_title: 'Alpha Warriors',
    group_id: '5gxu15',
    members: [
      {
        email: 'khang@gmail.com',
        phone: '12345678',
      },
      {
        email: 'kevin@gmail.com',
        phone: '87654321',
      },
      {
        email: 'hexiang@gmail.com',
        phone: '98765432',
      },
      {
        email: 'nevin@gmail.com',
        phone: '23456789',
      },
    ],
  },
  {
    group_title: 'Charlie Tigers',
    group_id: '9sqhwj',
    members: [{}],
  },
]

const TSS = {
  first_32: [
    ['Alpha Warriors', 'Charlie Tigers'],
    ['Bravo Eagles', 'Champions'],
  ],
  schedule: [
    {
      title: 'Dodgeball Semi-finals',
      time: '3:00pm',
      venue: 'Court 3',
    },
    {
      title: 'Prize Presentation',
      time: '3:00pm',
      venue: 'Court 3',
    },
  ],
}

const SOAR = {
  rotation_matrix: {
    physical: [
      {
        location: 'human readable',
        game_title: 'YeetBall',
        details: 'instructions',
        google_map_pin_url: 'https://goo.gl/maps/1Zrg21yeCGQJGhK18',
        coordinates: {
          lat: 9,
          long: 10,
        },
        timetable: [
          {
            time: '3:00pm',
            group_title: 'Alpha Warriors',
          },
          {
            time: '3:30pm',
            group_title: 'Charlie Tigers',
          },
        ],
      },
    ],
    virtual: [],
  },
}

const db = {
  participants,
  TSS,
  SOAR,
}
