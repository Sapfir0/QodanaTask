import { IDBPDatabase } from "idb";
import { injectable } from "inversify";
import { TodoData } from "typings";


@injectable()
export abstract class IndexedDBHelper {
    protected _dbName = "todo";
    protected _version = 3;
    protected _db: IDBPDatabase | null = null

    public abstract init = async (tableName: string) => {}

    public remove = async (tableName: string, index: number) => {
        if (this._db === null) {
            return null
        }
        await this._db.delete(tableName, index)
    }

    public write = async (tableName: string, todolist: TodoData[], clearAll=false) => {
        if (this._db === null) {
            return null
        }

        const tx = this._db.transaction([tableName], 'readwrite')
        const store = tx.objectStore(tableName)
        if (clearAll) {
            await store.clear()
        }

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