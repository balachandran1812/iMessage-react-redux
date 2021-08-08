import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// https://console.cloud.google.com/apis/api/firestore.googleapis.com/overview?project=i-message-clone-9536b&folder=&organizationId=

// https://console.cloud.google.com/home/dashboard?project=i-message-clone-9536b&folder=&organizationId=

// https://console.cloud.google.com/datastore/welcome?project=i-message-clone-9536b

// Error: Actions must be plain objects. Use custom middleware for async actions.


const firebaseConfig = {
    apiKey: "AIzaSyCbm_yg-Dv25Q1daeWB5e0faigTiEY_aYE",
    authDomain: "i-message-clone-9536b.firebaseapp.com",
    projectId: "i-message-clone-9536b",
    storageBucket: "i-message-clone-9536b.appspot.com",
    messagingSenderId: "933414241092",
    appId: "1:933414241092:web:e99f36ba190eb825f60d11",
    measurementId: "G-3MX5GBGMSQ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  // .settings({ experimentalForceLongPolling: true });

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };

export default db;
