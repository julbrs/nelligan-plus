import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import ReactGA from "react-ga";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyDjKWbGcbb9BY9CRQk-EYWrPbwD3tAqgyA",
  authDomain: "nelligan-plus.firebaseapp.com",
  databaseURL: "https://nelligan-plus.firebaseio.com",
  projectId: "nelligan-plus",
  storageBucket: "nelligan-plus.appspot.com",
  messagingSenderId: "779866671223",
  appId: "1:779866671223:web:de0d978a6c22be93acde72",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
  ReactGA.event({
    category: "Login",
    action: "Google Signin",
  });
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const persistUser = async (user) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (snapshot.exists) {
    try {
      await userRef.set(user);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
