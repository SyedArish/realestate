import { initializeApp } from "firebase/app"; 
import { getFirestore,doc,setDoc,addDoc } from "firebase/firestore";



// Load environment variables
// const {
//   FIREBASE_apiKey,
//   FIREBASE_authDomain,
//   FIREBASE_projectId,
//   FIREBASE_storageBucket,
//   FIREBASE_messagingSenderId,
//   FIREBASE_appId,
//   FIREBASE_measurementId
// } = process.env;

const firebaseConfig = {
  apiKey: "AIzaSyDZYQHbQF5GzcY7rIfP0NPG4EEsAqjVDo8",
  authDomain: "realestate-001.firebaseapp.com",
  databaseURL: "https://realestate-001-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "realestate-001",
  storageBucket: "realestate-001.appspot.com",
  messagingSenderId: "377980552261",
  appId: "1:377980552261:web:90da3c57bb7f6af76d4f2c",
  measurementId: "G-R8D0GP40PY"
};
// Initialize Firebase
let app;
let firestoredb
const initializeFirebaseApp=()=>{
try{
 app = initializeApp(firebaseConfig);
 firestoredb=getFirestore()
return app;
} 
catch(error){
  errorHandler(error,"firebase-intilize")
 
}
}



const getfirebaseapp=()=>app;
export {
  initializeFirebaseApp,
  getfirebaseapp, 
  firestoredb,
}

