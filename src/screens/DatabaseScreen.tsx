import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { auth, db } from '../../firebase'
import { RootStackParamList } from '../../App'
import Constant from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { useState, useEffect, useRef } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from '@firebase/firestore'

type logoutScreenNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>

const DevButton = ({ onPress, children }) => {
  const handlePress = () => {
    console.log(`${children} button was pressed.`)
    onPress()
    console.log(`execution of ${children} button-press done.`)
  }
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

namespace fb {
  export const read = async () => {
    const querySnapshot = await getDocs(collection(db, 'test'))
    querySnapshot.forEach((doc) => {
      console.log(doc.data().lord)
    })
  }
  export const writeCollection = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        expoPushTokens: ['OcXy78Pyf8Ryjwa9mnKZqe'],
      })

      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  export const writeDocument = async () => {
    try {
      const docRef = await setDoc(doc(db, 'test', 'expo'), {
        pushTokens: ['OcXy78Pyf8Ryjwa9mnKZqe'],
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  export const notifyAll = async () => {
    const docRef = doc(db, 'test', 'expo')
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
    // console.log('Document data:', docSnap.data())
    const data = docSnap.data()
    const expoPushTokens = data.pushTokens
    console.log(expoPushTokens)
  }
}

const DatabaseScreen = () => {
  const navigation = useNavigation<logoutScreenNavigationType>()
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>
        You are logged in as{' '}
        {auth.currentUser ? auth.currentUser.email : 'ERROR'}!
      </Text>
      <Text>This page will be used to test firebase:firestore read/writes</Text>
      <Text>
        the plan is to store a bunch of expo push notification tokens on
        firebase
      </Text>
      <DevButton onPress={() => fb.read()}>Read</DevButton>
      <DevButton onPress={() => fb.writeCollection()}>
        Write Collection
      </DevButton>
      <DevButton onPress={() => fb.writeDocument()}>Write Document</DevButton>
      <DevButton onPress={() => fb.notifyAll()}>
        Send Notification to all Expo Users
      </DevButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default DatabaseScreen
