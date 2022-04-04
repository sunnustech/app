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
  0: 'start',
  1: 'pause',
  2: 'resume',
  3: 'stopFinal',
  4: 'completeStage',
  5: 'fn02',
  6: 'fn03',
  7: 'fn04',
  8: 'fn05',
  9: 'fn06',
  10: 'fn07',
  11: 'fn08',
  12: 'fn09',
  13: 'fn10',
  14: 'fn11',
  15: 'fn12',
  16: 'fn13',
  17: 'fn14',
  18: 'fn15',
  19: 'fn16',
  20: 'fn17',
  21: 'fn18',
  22: 'fn19',
  23: 'fn20',
}

const stations: Array<[number, string]> = [
  [100, 'Slide'],
  [200, 'Relay2Maze'],
  [300, 'Sotong Houze'],
  [400, 'Snake and Ladders'],
  [500, 'GOLF'],
  [600, 'Nerf Battle'],
]

const generateQR = () => {
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

const QRIndex = generateQR()

export { generateQR, QRIndex }
