import { QRDictionaryGeneratorProps, SOARCommand } from '@/types/SOAR'
import ten from './tenThousand'

/*
 * Station List:
 * 1. Slide
 * 2. Relay2Maze
 * 3. Sotong Houze
 * 4. Snake and Ladders
 * 5. GOLF
 * 6. Nerf Battle
 */

type StationCommandList = Record<number, SOARCommand>

const stationCommands: StationCommandList = {
  100: 'start',
  200: 'pause',
  300: 'resume',
  400: 'stopFinal',
  500: 'completeStage',
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  13: '13',
  14: '14',
  15: '15',
  16: '16',
  17: '17',
  18: '18',
  19: '19',
  20: '20',
}

const stations: Array<[number, string]> = [
  [1000, 'Slide'],
  [2000, 'Relay2Maze'],
  [3000, 'Sotong Houze'],
  [4000, 'Snake and Ladders'],
  [5000, 'GOLF'],
  [6000, 'Nerf Battle'],
]

const generateStationQR = () => {
  const indexed: Record<string, QRDictionaryGeneratorProps> = {}
  stations.forEach((station) => {
    const [startPoint, name] = station
    for (const [offset, command] of Object.entries(stationCommands)) {
      const index = startPoint + parseInt(offset)
      indexed[ten[index]] = { command, station: name }
    }
  })
  return indexed
}

const QRIndex = generateStationQR()

export { generateStationQR, QRIndex }
