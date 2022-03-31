import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./secret/index.js";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

async function migrateUsers() {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
        const docRef = db.collection("users").doc(doc.id);
        console.log(doc.id, "=>", doc.data());
        docRef.update({
            "settings.defaultInput": false,
        });
    });
}

migrateUsers();
