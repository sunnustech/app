import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import QRCode from 'react-native-qrcode-svg'
import { useState } from 'react'
//import styles from '../styles/main'
import { Button } from '@/components/Buttons'
import colors from '@/styles/colors'
import { cipher, decipher } from '../util/crypto'
import CryptoJS from 'crypto-js'

const GeneratorScreen = () => {
  const SALT = 'MoonNUS'
  const SEPERATOR = '_'

  const [event, setEvent] = useState('')
  const [action, setAction] = useState('')
  const [facilitator, setFacilitator] = useState('')
  const [score, setScore] = useState(-1)
  const [modal, setModal] = useState(false)

  const generateScoreQR = () => {
    setModal(true)
  }

  const generateQRString = () => {
    if (modal) {
      const secret = cipher(SALT)
      let str =
        event +
        SEPERATOR +
        action +
        SEPERATOR +
        score.toString() +
        SEPERATOR +
        facilitator
      return secret(str).substring(1)
    }
  }
  const ciphertext = CryptoJS.AES.encrypt(
    'hello world', SALT
  ).toString()
  console.log('cipher: ', ciphertext)

  const decipher = CryptoJS.AES.decrypt(
    ciphertext, SALT
  ).toString(CryptoJS.enc.Utf8)
  console.log('decrypted: ', decipher)

  // // Encrypt
  // var ciphertext = CryptoJS.AES.encrypt(
  //   'my message',
  //   'secret key 123'
  // ).toString()
  //
  // // Decrypt
  // var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123')
  // var originalText = bytes.toString(CryptoJS.enc.Utf8)
  //
  // console.log(originalText) // 'my message'

  return (
    <KeyboardAvoidingView style={styles.centeredView} behavior="padding">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <QRCode value={generateQRString()} />
            <Pressable style={[styles.button]} onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>Hide QR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text>Welcome to the QR Code Generator page!</Text>
      <Text>Choose station</Text>
      <RNPickerSelect
        onValueChange={(value) => setEvent(value)}
        items={[
          { label: 'Slide', value: 'Slide', key: 0 },
          { label: 'Relay2Maze', value: 'Relay2Maze', key: 1 },
          { label: 'Sotong Houze', value: 'SotongHouze', key: 2 },
          { label: 'Snake and Ladders', value: 'SnakeandLadders', key: 3 },
          { label: 'Golf', value: 'Golf', key: 4 },
          { label: 'Nerf Battle', value: 'NerfBattle', key: 5 },
        ]}
      />
      <Text>Choose action</Text>
      <RNPickerSelect
        onValueChange={(value) => setAction(value)}
        items={[
          { label: 'start', value: 'start', key: 0 },
          { label: 'pause', value: 'pause', key: 1 },
          { label: 'resume', value: 'resume', key: 2 },
          { label: 'stopFinal', value: 'stopFinal', key: 3 },
          { label: 'completeStage', value: 'completeStage', key: 4 },
        ]}
      />
      <Text>Choose facil</Text>
      <RNPickerSelect
        onValueChange={(value) => setFacilitator(value)}
        items={[
          { label: 'Joseph', value: 'Joseph', key: 0 },
          { label: 'Tommy', value: 'Tommy', key: 1 },
          { label: 'Stacy', value: 'Stacy', key: 2 },
          { label: 'Leon', value: 'Leon', key: 3 },
          { label: 'Jessica', value: 'Jessica', key: 4 },
        ]}
      />
      <Text>Choose score</Text>
      <RNPickerSelect
        onValueChange={(value) => setScore(value)}
        items={[
          { label: '0', value: 0, key: 0 },
          { label: '1', value: 1, key: 1 },
          { label: '2', value: 2, key: 2 },
          { label: '3', value: 3, key: 3 },
          { label: '4', value: 4, key: 4 },
          { label: '5', value: 5, key: 5 },
          { label: '6', value: 6, key: 6 },
          { label: '7', value: 7, key: 7 },
          { label: '8', value: 8, key: 8 },
          { label: '9', value: 9, key: 9 },
          { label: '10', value: 10, key: 10 },
          { label: '11', value: 11, key: 11 },
          { label: '12', value: 12, key: 12 },
          { label: '13', value: 13, key: 13 },
          { label: '14', value: 14, key: 14 },
          { label: '15', value: 15, key: 15 },
          { label: '16', value: 16, key: 16 },
          { label: '17', value: 17, key: 17 },
          { label: '18', value: 18, key: 18 },
          { label: '19', value: 19, key: 19 },
          { label: '20', value: 20, key: 20 },
        ]}
      />

      <Button onPress={generateScoreQR}>Test</Button>
    </KeyboardAvoidingView>
  )
}

// Temporary styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.fuchsia[400],
  },
  buttonClose: {
    backgroundColor: colors.sky[400],
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default GeneratorScreen
