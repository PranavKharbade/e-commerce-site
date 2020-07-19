import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyDpcN-P3K_KuP6_j0bLAZQz2RKgo21k9Rw",
    authDomain: "crwn-db-5de3c.firebaseapp.com",
    databaseURL: "https://crwn-db-5de3c.firebaseio.com",
    projectId: "crwn-db-5de3c",
    storageBucket: "crwn-db-5de3c.appspot.com",
    messagingSenderId: "649748601862",
    appId: "1:649748601862:web:66253b74511e36b4427787",
    measurementId: "G-91E7G5J0W8"
  };
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore().doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  firebase.initializeApp(config);
  export const auth=firebase.auth();
  export const firestore =firebase.firestore;
  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);
  export default firebase;