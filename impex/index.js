import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAylcB2zrb8cugvcP9dVIZv0ae3JFnJf-E",
    authDomain: "nihongo-adb5b.firebaseapp.com",
    projectId: "nihongo-adb5b",
    storageBucket: "nihongo-adb5b.appspot.com",
    messagingSenderId: "714824540726",
    appId: "1:714824540726:web:79781ff1c27e1759686e97",
    measurementId: "G-GP18NJD7K1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getSettings(db) {
    const settingsRef = db.collection("settings").doc("data");
    const doc = await settingsRef.get();
    let data;
    if (doc.exists) {
        data = doc.data();
    }
    return data;
}

let data = getSettings(db);

console.log(data);
