// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";
import { FirebaseConfig } from "./FirebaseCreds.js"

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
// Get a reference to the database service
const db = getDatabase(app);

export const AddToDb = (fruit_id, quartiers, origin) => {
    const entriesRef = ref(db, 'entries');
    //const existingRef = ref(db, 'entries/-Mq6mULz7gLTkn2pT20Y');
    //var ret = set(existingRef, {
    //    fruit_id: "wrong",
    //    quartiers: quartiers,
    //    origin: origin
    //});
    const newRef = push(entriesRef);
    set(newRef, {
        fruit_id: fruit_id,
        quartiers: quartiers,
        origin: origin,
        date: serverTimestamp()
    });
}
