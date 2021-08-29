import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA8vbsWbuSNyPDobNnuyMstkmG-CMNUyys",
  authDomain: "docs-afe86.firebaseapp.com",
  projectId: "docs-afe86",
  storageBucket: "docs-afe86.appspot.com",
  messagingSenderId: "15672906602",
  appId: "1:15672906602:web:e0b6df60109e5edbb40b13",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export { db };
