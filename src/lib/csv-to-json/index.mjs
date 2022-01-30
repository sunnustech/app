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
  const outputFile = 'participants.json'

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

const participants = handlePartcipants()
const { first_32, schedule } = handleTSS()
