import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyC63F_Al2zsdNBEsGk-y3r214ICAYjN98k",
//   authDomain: "nexify-world.firebaseapp.com",
//   databaseURL: "https://testing-a0c27-default-rtdb.firebaseio.com/",
//   projectId: "nexify-world",
//   storageBucket: "nexify-world.appspot.com",
//   messagingSenderId: "83897218201",
//   appId: "1:83897218201:web:dbc96acbbf97cce19bf408",
//   measurementId: "G-H864PBP1F6"
// };




// const firebaseConfig = {
//   apiKey: "AIzaSyB9X2_EB9DHDIAGqVprchjRlQDWepcUszU",
//   authDomain: "trufluence-75086.firebaseapp.com",
//   projectId: "trufluence-75086",
//   storageBucket: "trufluence-75086.appspot.com",
//   messagingSenderId: "1054111402303",
//   appId: "1:1054111402303:web:1aa97f130eee705b92eb8a",
// };


const firebaseConfig = {
  apiKey: "AIzaSyC63F_Al2zsdNBEsGk-y3r214ICAYjN98k",
  authDomain: "nexify-world.firebaseapp.com",
  databaseURL: "https://nexify-world-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nexify-world",
  storageBucket: "nexify-world.appspot.com",
  messagingSenderId: "83897218201",
  appId: "1:83897218201:web:dbc96acbbf97cce19bf408",
  measurementId: "G-H864PBP1F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);


export const database = getDatabase(app);

export { storage };
