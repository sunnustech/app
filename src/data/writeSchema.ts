import push from '@/data/push'

import typedParticipants from '@/data/schema/participants'
import typedTSS from '@/data/schema/TSS'
import typedSOAR from '@/data/schema/SOAR'
import typedRoles from './schema/roles'

const writeSchema = async () => {
  push({ collection: 'participants', docs: typedParticipants })
  push({ collection: 'SOAR', docs: typedSOAR })
  push({ collection: 'TSS', docs: typedTSS })
  push({ collection: 'roles', docs: typedRoles })
}

export default writeSchema
