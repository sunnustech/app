import { useRef, useState, MutableRefObject } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import CryptoJS from 'crypto-js'
import QRCode from 'react-native-qrcode-svg'
import RNPickerSelect, { Item } from 'react-native-picker-select'
import CustomPicker from '../components/knockout/CustomPicker'
import PickerProvider from '../components/knockout/PickerProvider'

/* sunnus components */
//import styles from '../styles/main'
import { Button } from '@/components/Buttons'
import colors from '@/styles/colors'
import { UseState } from '../types/SOAR'

const GeneratorScreen = () => {
  const SALT = 'MoonNUS'
  const SEPERATOR = '_'

  const [event, setEvent] = useState('')
  const [action, setAction] = useState('')
  const [facilitator, setFacilitator] = useState('')
  const [score, setScore] = useState(-1)
  const [modal, setModal] = useState(false)

  /* For custom picker
  const fields: QRField[] = ['event', 'action', 'facilitator', 'score']
  const eventState = useState<SOARStations>('Slide')
  const actionState = useState<SOARActions>('start')
  const facilitatorState = useState<SOARFacilitators>()
  const score = useState<SOARScores>(0)
  */

  const generateScoreQR = () => {
    setModal(true)
  }

  const generateQRString = () => {
    if (modal) {
      const str =
        event +
        SEPERATOR +
        action +
        SEPERATOR +
        score.toString() +
        SEPERATOR +
        facilitator
      const cipherText = CryptoJS.AES.encrypt(str, SALT).toString()
      return cipherText
    }
  }

  type Field = 'station' | 'action' | 'facil' | 'score'
  type FieldStates = {
    station: UseState<string>
    action: UseState<string>
    facil: UseState<string>
    score: UseState<string>
  }

  const states: FieldStates = {
    station: useState('Slide'),
    action: useState('startTimer'),
    facil: useState('Jessica'),
    score: useState('0'),
  }

  const display: FieldStates = {
    station: useState('Slide'),
    action: useState('startTimer'),
    facil: useState('Jessica'),
    score: useState('0'),
  }

  const refs: Record<Field, MutableRefObject<RNPickerSelect | null>> = {
    station: useRef<RNPickerSelect>(null),
    action: useRef<RNPickerSelect>(null),
    facil: useRef<RNPickerSelect>(null),
    score: useRef<RNPickerSelect>(null),
  }

  const items: Record<Field, Item[]> = {
    station: [
      { label: 'Slide', value: 'Slide', key: 0 },
      { label: 'Relay2Maze', value: 'Relay2Maze', key: 1 },
      { label: 'Sotong Houze', value: 'SotongHouze', key: 2 },
      { label: 'Snake and Ladders', value: 'SnakeandLadders', key: 3 },
      { label: 'Golf', value: 'Golf', key: 4 },
      { label: 'Nerf Battle', value: 'NerfBattle', key: 5 },
    ],
    action: [
      { label: 'startTimer', value: 'startTimer', key: 0 },
      { label: 'pauseTimer', value: 'pauseTimer', key: 1 },
      { label: 'resumeTimer', value: 'resumeTimer', key: 2 },
      { label: 'stopTimer', value: 'stopTimer', key: 3 },
      { label: 'completeStage', value: 'completeStage', key: 4 },
    ],
    facil: [
      { label: 'Joseph', value: 'Joseph', key: 0 },
      { label: 'Tommy', value: 'Tommy', key: 1 },
      { label: 'Stacy', value: 'Stacy', key: 2 },
      { label: 'Leon', value: 'Leon', key: 3 },
      { label: 'Jessica', value: 'Jessica', key: 4 },
    ],
    score: [
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
    ],
  }

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
            <QRCode value={generateQRString()} size={240} />
            <Button onPress={() => setModal(false)}>Hide QR</Button>
          </View>
        </View>
      </Modal>
      <Text>Welcome to the QR Code Generator page!</Text>
      <Text>Choose station</Text>
      <PickerProvider
        _ref={refs.station}
        setState={states.station[1]}
        display={display.station}
        items={items.station}
      />
      <CustomPicker pickerRef={refs.station} display={display.station[0]} />
      <Text>Choose action</Text>
      <PickerProvider
        _ref={refs.action}
        setState={states.action[1]}
        display={display.action}
        items={items.action}
      />
      <CustomPicker pickerRef={refs.action} display={display.action[0]} />
      <Text>Choose facil</Text>
      <PickerProvider
        _ref={refs.facil}
        setState={states.facil[1]}
        display={display.facil}
        items={items.facil}
      />
      <CustomPicker pickerRef={refs.facil} display={display.facil[0]} />
      <Text>Choose score</Text>
      <PickerProvider
        _ref={refs.score}
        setState={states.score[1]}
        display={display.score}
        items={items.score}
      />
      <CustomPicker pickerRef={refs.score} display={display.score[0]} />
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
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerHitBox: {
    height: 100,
  },
})

export default GeneratorScreen
