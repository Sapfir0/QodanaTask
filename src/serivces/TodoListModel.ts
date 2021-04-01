import { openDB } from "idb";
import { injectable } from "inversify";
import { TodoData } from "typings";
import { IndexedDBHelper } from "./IndexedDBHelper";

@injectable()
export class TodoListModel extends IndexedDBHelper<TodoData> {
    public init = async (tableName: string) => {
        this._db = await openDB(this._dbName, this._version, {
            upgrade(db, oldVersion, newVersion, transaction) {
                db.createObjectStore(tableName, { keyPath: "id" });
            }
        })
    }
}