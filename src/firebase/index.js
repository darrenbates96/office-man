import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYD9yWI7JKbHvFMe822e5lgVMttG_lSfM",
    authDomain: "specno-3a6ba.firebaseapp.com",
    databaseURL: "https://specno-3a6ba.firebaseio.com",
    projectId: "specno-3a6ba",
    storageBucket: "specno-3a6ba.appspot.com",
    messagingSenderId: "270092281652",
    appId: "1:270092281652:web:3fccc1aca9d29bccc56761"
};

// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);

export default firebase;
