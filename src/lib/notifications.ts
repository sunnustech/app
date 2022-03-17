import { useState, useEffect, useRef } from 'react'
import { Subscription } from 'expo-modules-core'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { Notification } from 'expo-notifications/build/Notifications.types'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string | Array<string>) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'String Push Token',
    body: 'And here is the body!',
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

function notificationInit() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })
  const [expoPushToken, setExpoPushToken] = useState('')
  const blankNotification: Notification = {
    date: 0,
    request: {
      identifier: '',
      content: {
        title: null,
        subtitle: null,
        body: null,
        data: {},
        sound: null,
      },
      trigger: {
        type: 'push',
        payload: {},
      },
    },
  }
  const [notification, setNotification] =
    useState<Notification>(blankNotification)
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

    /* This listener is fired whenever a user taps on or interacts with a
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
  // console.log(expoPushToken)
  return {
    expoPushToken,
    notification,
  }
}

export { sendPushNotification, notificationInit }
