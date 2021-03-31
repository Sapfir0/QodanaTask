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

    public remove = async (tableName: string, index: number) => {
        if (this._db === null) {
            return null
        }
        await this._db.delete(tableName, index)
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

    public update = async (tableName: string, todo: TodoData) => {
        if (this._db === null) {
            return null
        }

        await this._db.put(tableName, {...todo})
  
        
    }

    public getData = async (tableName: string): Promise<TodoData[]>  => {
        if (this._db === null) {
            return []
        }
  
        return await this._db.getAll(tableName)

    }

}