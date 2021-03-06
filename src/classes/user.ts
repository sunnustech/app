import { db } from '@/sunnus/firebase'
import { sanitizePhoneNumber } from '@/utils/index'
import {
  setDoc,
  FirestoreDataConverter,
  collection,
  getDoc,
  doc,
} from 'firebase/firestore'
import { Init } from '@/types/classes'

export class User {
  realEmail: string
  role: string
  phoneNumber: string
  teamName: string
  email: string
  loginIdNumberPart: string
  loginId: string
  uid: string
  static collectionRef = collection(db, 'users')
  static empty = new User({
    phoneNumber: '',
    role: '',
    email: '',
    teamName: '',
  })
  /** converts a User to a database-friendly object */
  static converter: FirestoreDataConverter<User> = {
    toFirestore: (user: User) => {
      return {
        email: user.email,
        phoneNumber: user.phoneNumber,
        realEmail: user.email,
        role: user.role,
        teamName: user.teamName,
        loginId: user.loginId,
        uid: user.uid,
      }
    },
    fromFirestore: (snapshot) => {
      const data = snapshot.data()
      const user = new User({
        phoneNumber: data.phoneNumber,
        role: data.role,
        email: data.email,
        teamName: data.teamName,
      })
      user.setUid(data.uid)
      user.setLoginId(data.loginId)
      return user
    },
  }
  /**
   * gets a user object from the database
   * @param {string} uid
   * @returns {Promise<User>}
   */
  static async get(uid: string): Promise<User> {
    const docRef = doc(this.collectionRef, uid).withConverter(this.converter)
    const snapshot = await getDoc(docRef)
    const data = snapshot.data()
    if (data) {
      return data
    }
    return User.empty
  }
  /**
   * add/updates the database with the user
   * @param {User} user
   */
  static async set(user: User) {
    const docRef = doc(this.collectionRef, user.uid).withConverter(
      this.converter
    )
    await setDoc(docRef, user, { merge: true })
  }
  // constructor values can be read directly from csv
  public constructor(props: Init.User) {
    this.phoneNumber = sanitizePhoneNumber(props.phoneNumber)
    this.realEmail = props.email
    this.role = props.role || ''
    this.teamName = props.teamName
    this.email = ''
    this.loginId = ''
    this.loginIdNumberPart = ''
    this.uid = ''
  }
  isEmpty(): boolean {
    const values = Object.values(this)
    return values.every((v) => v === '')
  }
  setUid(value: string) {
    this.uid = value
  }
  setLoginId(value: string) {
    this.loginIdNumberPart = value
    this.loginId = `${this.teamName}${value}`
    this.email = `${this.loginId}@sunnus.com`
  }
}
