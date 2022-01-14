import { useState, useEffect, useRef } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  Platform,
  View,
} from 'react-native'

/* expo */
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

/* navigation */
// import { RootStackParamList } from '../../App'
// import { useNavigation } from '@react-navigation/native'
// import { NativeStackNavigationProp as NSNP } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '../../firebase'
import { notifications as styles } from '../styles/main'

/* experimental */
import { Subscription } from 'expo-modules-core'
import { Notification } from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const NotificationScreen = () => {
  // const navigation = useNavigation<NSNP<RootStackParamList, 'Notifications'>>()
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notification>()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    // console.log('useEffect triggered!')
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(String(token))
    )

    /* This listener is fired whenever a notification is received while the app
     * is foregrounded
     */
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    /* This listener is fired whenever a user taps on or inteacts with a
     * notification (works when app is foregrounded, backgrounded, or killed)
     */
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      const nc = notificationListener.current
      const rc = responseListener.current
      nc ? Notifications.removeNotificationSubscription(nc) : null
      rc ? Notifications.removeNotificationSubscription(rc) : null
    }
  }, [])
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
          <Text>Body: {notification && notification?.request.content.body}</Text>
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

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  console.log('-- start of sendPushNotification function --')
  console.log('expoPushToken: ', expoPushToken)
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
  console.log('-- end of sendPushNotification function --')
}

async function registerForPushNotificationsAsync() {
  let token = ''
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export default NotificationScreen
