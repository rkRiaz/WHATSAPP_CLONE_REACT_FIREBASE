import firebase from "firebase"
const firebaseConfig = {
    apiKey: "Your data from firebase",
    authDomain: "Your data from firebase",
    databaseURL: "Your data from firebase",
    projectId: "Your data from firebase",
    storageBucket: "Your data from firebase",
    messagingSenderId: "Your data from firebase",
    appId: "Your data from firebase",
    measurementId: "Your data from firebase"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
 
  export {auth, provider}
  export default db