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

export const saveLog = async (logs) => {
    try {
        const db = await getDB();
        if (Array.isArray(logs)) {
            for (const log of logs) {
                await db.put(STORE_NAME, log);  // Usamos put para cargar log directo, que ya tiene el field 'id'
            }
        } else {
            await db.put(STORE_NAME, logs);
        }
        console.log('Log guardado:', logs);
    } catch (error) {
        console.error('Error al guardar el log:', error);
    }
};

export const getLogs = async () => {
    try {
        const db = await getDB();
        return await db.getAll(STORE_NAME);
    } catch (error) {
        console.error('Error al obtener los logs:', error);
        return [];
    }
};

export const deleteLog = async (id) => {
    try {
        const db = await getDB();
        await db.delete(STORE_NAME, id);
        console.log(`Log con id ${id} eliminado.`);
    } catch (error) {
        console.error('Error al eliminar el log:', error);
    }
};


export const clearLogs = async () => {
    try {
        const db = await getDB();
        await db.clear(STORE_NAME);
        console.log('Todos los logs han sido eliminados.');
    } catch (error) {
        console.error('Error al limpiar los logs:', error);
    }
};


export const isOnline = () => {
    return navigator.onLine;
  };