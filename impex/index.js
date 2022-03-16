import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { parseDataToJSON } from "./import.js";
import serviceAccount from "./secret/index.js";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

async function importQuestions() {
    const data = await parseDataToJSON();
    if (data) {
        const newVersion = uuidv4();
        const settingsRef = db.collection("settings").doc("data");
        const doc = await settingsRef.get();
        if (doc.exists) {
            const oldData = doc.data();
            await settingsRef.set({ ...oldData, versionId: newVersion });
        }
        data.forEach(async (q) => {
            const id = uuidv5(q.id, MY_NAMESPACE);
            const newData = { ...q, id };
            console.log(`${id} == ${q.polish}`);
            const qRef = db.collection("flashcards").doc(id);
            await qRef.set({ ...newData }, { merge: true });
        });
    }
}

importQuestions();
