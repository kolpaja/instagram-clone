import firebase from 'firebase'
// eslint-disable-next-line
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3kv9oxX1U_O8P-D_mVW9UuvBbvcIM_mc",
    authDomain: "instagram-65fb9.firebaseapp.com",
    projectId: "instagram-65fb9",
    storageBucket: "instagram-65fb9.appspot.com",
    messagingSenderId: "560672436756",
    appId: "1:560672436756:web:eaefd263f498a42f246d01",
    measurementId: "G-3JNK1XPHXX"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }