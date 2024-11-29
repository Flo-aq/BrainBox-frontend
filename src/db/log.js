import {openDB} from "idb";

const DATABASE_NAME = 'dblogs';
const DATABASE_VERSION = 1;
const STORE_NAME = 'logs' 

export const getDB = async () => {
    return await openDB(DATABASE_NAME, DATABASE_VERSION, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, {keyPath: 'id'})
        }
    })
}

export const saveLog =  async (log) => {
    const db = await getDB()
    await db.add(STORE_NAME, log)
}

export const getLOgs = async () =>{
    const db = await getDB()
    return await db.getAll(STORE_NAME)
}