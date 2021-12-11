// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { startAt, endAt, onValue, getDatabase, ref, push, set, serverTimestamp, orderByChild, limitToLast, query } from "firebase/database";
import { FirebaseConfig } from "./FirebaseCreds.js"

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
// Get a reference to the database service
const db = getDatabase(app);

var ENTRIES_NAME = 'entries';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ENTRIES_NAME = 'entries_dev';

export const AddToDb = (fruit_id, quartiers, origin) => {
    const entriesRef = ref(db, ENTRIES_NAME);
    const newRef = push(entriesRef);
    set(newRef, {
        fruit_id: fruit_id,
        quartiers: quartiers,
        origin: origin,
        date: serverTimestamp()
    });
}

// returns more recent queries
export const GetLatest = (count, cbk) => {
    const entriesRef = ref(db, ENTRIES_NAME);
    const queryConstraints = [orderByChild("date"), limitToLast(count)];
    const queryQ = query(entriesRef, ...queryConstraints);
    return onValue(queryQ, cbk)
}

// returns count of each fruit
export const GetCount = (cbk) => {
    const entriesRef = ref(db, ENTRIES_NAME);
    const queryQ = query(entriesRef);
    return onValue(queryQ, cbk)
}

// returns quartiers per fruit
export const GetRepartition = (fruit_id, cbk) => {
    const entriesRef = ref(db, ENTRIES_NAME);
    const queryConstraints = [orderByChild("fruit_id"), startAt(fruit_id), endAt(fruit_id)];
    const queryQ = query(entriesRef, ...queryConstraints);
    return onValue(queryQ, cbk)
}