import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'

const root = process.cwd()
const file = fs.readFileSync(path.join(root, 'participants.csv'), 'utf8')

const output = []

const data = parse(file)

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
console.log(output)

fs.writeFileSync('participants.json', JSON.stringify(output))
