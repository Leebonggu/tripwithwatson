import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC96Y4OvT6PlKoyAzRxr8rYvjhiSZoUmR4",
  authDomain: "travel-9bb75.firebaseapp.com",
  databaseURL: "https://travel-9bb75.firebaseio.com",
  projectId: "travel-9bb75",
  storageBucket: "travel-9bb75.appspot.com",
  messagingSenderId: "1011339973624"
};

firebase.initializeApp(config);
const googleAuth = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const database = firebase.database();

export {
  googleAuth,
  database,
  auth,
  firebase,
};