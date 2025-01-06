// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig2 = {
//   apiKey: "AIzaSyC1mU4cGi0kxGmAjzvA-zrkGVbXqfMQBtQ",
//   authDomain: "krashak-setu-testing.firebaseapp.com",
//   projectId: "krashak-setu-testing",
//   storageBucket: "krashak-setu-testing.appspot.com",
//   messagingSenderId: "730432132265",
//   appId: "1:730432132265:web:eb84541bbc422dfa1705b8",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig2);

// // Initialize Firestore
// export const db = getFirestore(app);

// Import necessary Firebase modules
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1mU4cGi0kxGmAjzvA-zrkGVbXqfMQBtQ",
  authDomain: "krashak-setu-testing.firebaseapp.com",
  projectId: "krashak-setu-testing",
  storageBucket: "krashak-setu-testing.appspot.com",
  messagingSenderId: "730432132265",
  appId: "1:730432132265:web:eb84541bbc422dfa1705b8",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage instances
export const db = getFirestore(app);
export const storage = getStorage(app);
