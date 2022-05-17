import { css, join, debug } from '@/styles/utils'
import config, { core } from './config'
import colors from '@/styles/colors'

const button = {
  map: css({
    base: join([
      {
        width: config.map.baseButton.size,
        height: config.map.baseButton.size,
        backgroundColor: config.map.baseButton.color,
        borderRadius: config.button.round.radius,
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      core.shadow,
    ]),
    whiteText: {
      fontWeight: '800',
      color: 'white',
      textAlign: 'center',
    },
    bottomButton: {
      marginTop: 14,
    },
    qrBack: join([
      {
        borderRadius: 1000,
        width: '50%',
        display: 'flex',
        padding: 20,
        marginBottom: 36,
      },
      core.marginAuto,
      core.trasclucentBg,
      core.centered,
    ]),
  }),
  outline: css({
    header: join([
      {
        height: config.button.round.size,
        width: config.button.round.size,
        borderRadius: config.button.round.radius,
        // backgroundColor: colors.blue[100],
      },
      core.centered,
    ]),
    footer: join([
      {
        borderRadius: config.button.round.radius,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        backgroundColor: debug('amber'),
      },
      core.centered,
    ]),
    back: {
      color: colors.homeFg,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      height: 50,
      width: 50,
    },
  }),
  pill: css({
    base: {
      width: '100%',
      borderWidth: config.border,
      padding: 10,
      borderRadius: config.radius,
      marginVertical: 8,
      alignItems: 'center',
    },
    tss: {
      flex: 1,
      marginTop: 24,
      height: 64,
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 6,
      shadowColor: colors.shadow,
      shadowRadius: 2,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      display: 'flex',
      borderWidth: 4,
      borderColor: colors.transparent,
    },
  }),
  series: css({
    base: join([
      {
        width: '100%',
        borderWidth: config.border,
        height: 108,
        borderBottomRightRadius: config.radius,
        borderTopLeftRadius: config.radius,
        marginVertical: 10,
      },
      core.centered,
    ]),
  }),
}

export default button
