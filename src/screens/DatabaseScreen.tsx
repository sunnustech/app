import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  Platform,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { auth } from '../../firebase'
import { RootStackParamList } from '../../App'
import Constant from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { useState, useEffect, useRef } from 'react'

type logoutScreenNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>

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
