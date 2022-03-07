import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAylcB2zrb8cugvcP9dVIZv0ae3JFnJf-E',
    authDomain: 'nihongo-adb5b.firebaseapp.com',
    projectId: 'nihongo-adb5b',
    storageBucket: 'nihongo-adb5b.appspot.com',
    messagingSenderId: '714824540726',
    appId: '1:714824540726:web:79781ff1c27e1759686e97',
    measurementId: 'G-GP18NJD7K1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
