import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

const opts = {
  map: {
    baseButton: {
      size: 56,
      color: colors.white,
    },
  },
}

const css = StyleSheet.create

export namespace globalStyles {
  export namespace buttons {
    export const map = css({
      base: {
        width: opts.map.baseButton.size,
        height: opts.map.baseButton.size,
        backgroundColor: opts.map.baseButton.color,
        borderRadius: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      blue: {
        backgroundColor: colors.blue[400],
      },
      whiteText: {
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
      },
      bottomButton: {
        marginTop: 14,
      },
    })
  }
}
