const medicPoints = [
  {
    id: 'MP1',
    title: '_CLB',
    type: 'medic',
    google_map_pin_url: '',
    coordinate: {
      // NUS Central Library
      latitude: 1.2967230288327685,
      longitude: 103.77322568112703,
    },
  },
  {
    id: 'MP2',
    type: 'medic',
    title: '_Museum',
    google_map_pin_url: '',
    coordinate: {
      // NUS Museum
      latitude: 1.301805582121946,
      longitude: 103.77231968190145,
    },
  },
]

const waterPoints = [
  {
    id: 'WP1',
    title: '_UTown Green',
    type: 'water',
    google_map_pin_url: '',
    coordinate: {
      // UTown Green
      latitude: 1.3049891103654925,
      longitude: 103.77322845557454,
    },
  },
  {
    id: 'WP2',
    type: 'water',
    title: '_NUH',
    google_map_pin_url: '',
    coordinate: {
      // NUH
      latitude: 1.2941740290024657,
      longitude: 103.78306481546151,
    },
  },
]

const adminLocations = [...medicPoints, ...waterPoints]

export default adminLocations
