import { IDBPDatabase, openDB } from "idb";
import { injectable } from "inversify";
import { TodoData } from "typings";


@injectable()
export class IndexedDBHelper {
    private _dbName = "todo";
    private _version = 3;
    //  // не приемлимо для этого уровня абстракции, но для простоты прототипирования оставлю
    private _db: IDBPDatabase | null = null
    // private _request: IDBOpenDBRequest

    constructor() {
    }

    public init = async (tableName: string) => {
        this._db = await openDB(this._dbName, this._version, {
            upgrade(db, oldVersion, newVersion, transaction) {
                db.createObjectStore(tableName, { keyPath: "id" });
            }
        })
        
    }

    public write = async (tableName: string, todolist: TodoData[]) => {
        if (this._db === null) {
            return null
        }

        const tx = this._db.transaction([tableName], 'readwrite')
        const store = tx.objectStore(tableName)
  
        for (const item of todolist) {
            if (store.put) {
                store.put(item) 
            }
        }
        await tx.done
    }

    public getData = async (tableName: string): Promise<TodoData[]>  => {
        if (this._db === null) {
            return []
        }

        const tx = this._db.transaction([tableName], 'readwrite')
        const store = tx.objectStore(tableName)
  
        return await store.getAll()

    }

}