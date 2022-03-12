import firebase from 'firebase/compat/app'

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config={
    
    apiKey: "AIzaSyDoTPo1lX37g7ZCxyBMHBmIEWbcjQgKM14",
    authDomain: "online-shopping-db-de467.firebaseapp.com",
    projectId: "online-shopping-db-de467",
    storageBucket: "online-shopping-db-de467.appspot.com",
    messagingSenderId: "756516647023",
    appId: "1:756516647023:web:42dffe8ebdd77c87561d9a",
    measurementId: "G-E5HXYCXNRY"
      
} 
firebase.initializeApp(config);


export const auth =firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle=()=>(auth.signInWithPopup(provider))

export default firebase;
