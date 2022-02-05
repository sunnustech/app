import { KeyboardAvoidingView, Text, Button, View } from 'react-native'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { notifications as styles } from '@/styles/main'
import { sendPushNotification, notificationInit } from '@/lib/notifications'

const KnockoutTable = () => {
  /*
   * have tabs to toggle which knockout table to view
   * dodgeball/volleyball/tchoukball/frisbee...
   */

  /* BACKEND FUNCTIONS */

  /*
   * takes in
   *  1. event type (dodgeball/volleyball/tchoukball/frisbee...)
   *  2. match id
   *  3. match winner
   * writes the outcome to database
   *
   */
  function handleEndOfMatch() {}

  /*
   *
   */
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    ></KeyboardAvoidingView>
  )
}

export default KnockoutTable
