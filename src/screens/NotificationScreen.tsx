import { KeyboardAvoidingView, Text, Button, View } from 'react-native'

/* sunnus components */
import { auth } from '@/sunnus/firebase'
import { sendPushNotification, notificationInit } from '@/lib/notifications'
import { globalStyles } from '@/styles/global'

const NotificationScreen = () => {
  const { expoPushToken, notification } = notificationInit()
  return (
    <KeyboardAvoidingView style={globalStyles.container.base} behavior="padding">
      <Text>
        You are logged in as{' '}
        {auth.currentUser ? auth.currentUser.email : 'ERROR'}!
      </Text>
      <Text>This page will be used to test-drive notifications</Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Title: {notification && notification?.request.content.title}{' '}
          </Text>
          <Text>
            Body: {notification && notification?.request.content.body}
          </Text>
          <Text>
            Data:{' '}
            {notification && JSON.stringify(notification?.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken)
          }}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default NotificationScreen
