import { KeyboardAvoidingView, Modal, Pressable, Text, View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import QRCode from 'react-native-qrcode-svg'
import { useState } from 'react'
//import styles from '../styles/main'
import { Button } from '../components/Buttons'

const GeneratorScreen = () => {
  const [score, setScore] = useState(0)
  const [modal, setModal] = useState(false)

  const generateScoreQR = () => {}

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
            <QRCode value="https://www.youtube.com/watch?v=w0E9-Bir664" />
            <Pressable style={[styles.button]} onPress={() => setModal(!modal)}>
              <Text style={styles.textStyle}>Hide QR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text>Welcome to the QR Code Generator page!</Text>
      <Text>Choose score</Text>
      <RNPickerSelect
        onValueChange={(value) => setScore(value)}
        items={[
          { label: '0', value: 0, key: 0 },
          { label: '100', value: 100, key: 1 },
          { label: '200', value: 200, key: 2 },
          { label: '300', value: 300, key: 3 },
        ]}
      />
      <Button onPress={() => setModal(true)}>Test</Button>
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
    shadowColor: '#000',
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default GeneratorScreen
