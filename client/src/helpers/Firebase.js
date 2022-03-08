import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  authDomain: "mystiq-bad6a.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://mystiq-bad6a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "mystiq-bad6a",
  storageBucket: "mystiq-bad6a.appspot.com",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export  {app,database};