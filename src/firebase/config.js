import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBQUuKQdUGyM8IXdlMOZNn_cGm1BGGxEMQ",
    authDomain: "blankproj2023.firebaseapp.com",
    projectId: "blankproj2023",
    storageBucket: "blankproj2023.appspot.com",
    messagingSenderId: "854500877387",
    appId: "1:854500877387:web:fafb79ee6cf7e9d1bd99ce"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init firestore
const db = getFirestore(app)

// init firebase auth
const auth = getAuth(app)

// init firebase storage
const storage = getStorage(app)

export { db, auth, storage }