import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyB5ho5RDxsESglfhn5WAHkYvPjw1GBzYiQ",
    authDomain: "nicochat-65ea1.firebaseapp.com",
    projectId: "nicochat-65ea1",
    storageBucket: "nicochat-65ea1.appspot.com",
    messagingSenderId: "201673329601",
    appId: "1:201673329601:web:7cf29b78a37299216dbd40"
  }).auth();
