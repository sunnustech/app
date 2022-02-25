import push from '@/data/push'

// import jsonParticipants from '@/data/csv-json/participants.json'
// import jsonTSS from '@/data/csv-json/TSS.json'
// import jsonSOAR from '@/data/csv-json/SOAR.json'

import typedParticipants from '@/data/schema/participants'
import typedTSS from '@/data/schema/TSS'
import typedSOAR from '@/data/schema/SOAR'
import typedADMIN from '@/data/schema/ADMIN'

const writeSchema = async () => {
  push({ collection: 'participants', data: typedParticipants })
  push({ collection: 'SOAR', data: typedSOAR })
  push({ collection: 'TSS', data: typedTSS })
  push({ collection: 'ADMIN', data: typedADMIN })
}

export default writeSchema
