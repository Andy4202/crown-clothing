import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpvtPy_QDv2bHYyxU8CUYlVEBl5ccVI_E",
  authDomain: "crwn-db-d5752.firebaseapp.com",
  projectId: "crwn-db-d5752",
  storageBucket: "crwn-db-d5752.appspot.com",
  messagingSenderId: "64005190946",
  appId: "1:64005190946:web:6b2e25a94d58d3cd32a17b",
  measurementId: "G-H9G2XQ7ZQ8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return 

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    console.log('🍄', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInformation
            })

        } catch (error) {
            console.log('Error creating the user', error.message)
        }
        return userDocRef;
    }
}


export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
};