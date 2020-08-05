import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCZgUaoh4e5F0wMADDOwgAkd09oXh2o9Kk",
  authDomain: "instagram-clone-44c23.firebaseapp.com",
  databaseURL: "https://instagram-clone-44c23.firebaseio.com",
  projectId: "instagram-clone-44c23",
  storageBucket: "instagram-clone-44c23.appspot.com",
  messagingSenderId: "108814341803",
  appId: "1:108814341803:web:88f88f67487b706e1049ee",
  measurementId: "G-XK6F7VWQE2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage };