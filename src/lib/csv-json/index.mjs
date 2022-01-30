import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

function getCSV(filename) {
  const file = fs.readFileSync(path.join(root, filename), 'utf8')
  return parse(file)
}

function handlePartcipants() {
  const data = getCSV('participants.csv')

  /* use first row as headers */
  const headers = data.shift()

  /* turn each row into an object, taking keys from the header row */
  const zipped = data.map((row) =>
    headers.reduce(
      (obj, key, index) => ({
        ...obj,
        [key]: row[index],
      }),
      {}
    )
  )

  /* process member emails and phone numbers */
  const output = []
  zipped.forEach((row) => {
    const res = {}
    res.id = row.id
    res.group_title = row.group_title
    res.members = []
    for (var i = 1; i <= 10; i++) {
      const email = row[`email_${i}`]
      const phone = row[`phone_${i}`]
      if (email && phone) {
        res.members.push({ email, phone })
      } else if (email || phone) {
        console.log(row.id, 'member', i, 'has missing email/phone number')
      }
    }
    output.push(res)
  })

  // fs.writeFileSync(outputFile, JSON.stringify(output))
  return output
}

function handleTSS() {
  /* columns A-C is first_32
  /* columns E-H is schedule
   */
  const filename = 'TSS.csv'
  const file = fs.readFileSync(path.join(root, filename), 'utf8')
  const data = parse(file, { columns: true })
  const outputFile = 'TSS.json'

  /* keeps only the keys of object listed in keysKept */
  function keep(data, keysKept) {
    return data.map((row) =>
      keysKept.reduce(
        (obj, key) => ({
          ...obj,
          [key]: row[key],
        }),
        {}
      )
    )
  }

  /* grab the first_32 */
  const first_32 = keep(data, ['A', 'B'])

  /* grab the schedule
   * and remove entries with no title
   */
  const schedule = keep(data, ['time', 'venue', 'title']).filter(
    (e) => e.title != ''
  )

  return { first_32, schedule }
}

function handleSOAR() {
  const data = getCSV('SOAR.csv')

  function parseLocations(data) {
    const locations = data.map((row) => row.slice(0, 6))

    const headers = locations.shift()

    /* some parsing helpers */
    const parseKey = (key) => {
      return key.replace('?', '').replace('/', '').replace(/ /g, '_')
    }
    const parseValue = (value) => {
      switch (value) {
        case 'yes':
          return true
        case 'no':
          return false
        default:
          return value
      }
    }

    /* turn each row into an object, taking keys from the header row */
    const zipped = locations
      .map((row) =>
        headers.reduce(
          (obj, key, index) => ({
            ...obj,
            [parseKey(key)]: parseValue(row[index]),
          }),
          {}
        )
      )
      .filter((e) => e.title != '')
    return zipped
  }

  function parseSchedules(data, locations) {
    const idx = data[0].reduce((res, element, idx) => {
      element === 'time' && res.push(idx)
      return res
    }, [])
    const output = []
    idx.forEach((i) => {
      const title = data[0][i - 1]
      const locationList = data.map((row) => row.slice(i, i + 2))
      const headers = locationList.shift()
      const schedule = locationList
        .map((row) =>
          headers.reduce(
            (obj, key, index) => ({
              ...obj,
              [key]: row[index],
            }),
            {}
          )
        )
        .filter((e) => e.time != '')
      const found = locations.find((e) => e.title === title)
      delete found.sn
      output.push({ ...found, schedule })
    })
    return output
  }

  const locations = parseLocations(data)
  const output = parseSchedules(data, locations)
  return output
}

const participants = handlePartcipants()
const TSS = handleTSS()
const SOAR = handleSOAR()

/* write to json files */
fs.writeFileSync('participants.json', JSON.stringify(participants))
fs.writeFileSync('TSS.json', JSON.stringify(TSS))
fs.writeFileSync('SOAR.json', JSON.stringify(SOAR))
