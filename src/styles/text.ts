import { css } from '@/styles/utils'
import config from './config'
import colors from '@/styles/colors'

const text = css({
  modalTitle: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.gray[700],
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  settings: {
    marginLeft: 4,
    fontWeight: '600',
    color: config.foreground,
    textAlign: 'center',
  },
  pillButton: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  back: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.homeFg,
  },
  calloutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[700],
    marginBottom: 8,
    textAlign: 'center'
  },
})

export default text
