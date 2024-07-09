import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYwMimaZBvQqZhRVYhBybXpBuTjsXj-Rc",
  authDomain: "srm-notes-app.firebaseapp.com",
  projectId: "srm-notes-app",
  storageBucket: "srm-notes-app.appspot.com",
  messagingSenderId: "58022515547",
  appId: "1:58022515547:web:1fb2992b4c92ace5d3807e",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
