import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCasJbj1KUvEbld4-NbguLAx7g3yB3GVPs",
    authDomain: "whatsapp-clone-9412b.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-9412b.firebaseio.com",
    projectId: "whatsapp-clone-9412b",
    storageBucket: "whatsapp-clone-9412b.appspot.com",
    messagingSenderId: "682108017350",
    appId: "1:682108017350:web:8f2310375c9b2a274615c7",
    measurementId: "G-DBRHWSCL5M"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
 
  export {auth, provider}
  export default db