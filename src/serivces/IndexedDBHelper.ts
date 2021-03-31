import { injectable } from "inversify";
import { TodoData } from "typings";


@injectable()
export class IndexedDBHelper {
    private _dbName = "todo";
    private _version = 3;
    private _tableName = "todolist" // не приемлимо для этого уровня абстракции, но для простоты прототипирования оставлю
    private _db: IDBDatabase | null = null
    private _request: IDBOpenDBRequest

    constructor() {
        this._request = indexedDB.open(this._dbName, this._version);
        this._request.onupgradeneeded = (event) => {            
            const db = this._request.result;
            const objectStore = db.createObjectStore(this._tableName, { keyPath: "id" });
            // for (const task of initialTododata) {
            //   objectStore.add(task);
            // }
        };
    }

    public init = (onInited: (...args: any)  => void) => {
        this._request.onerror = (event) => { // тоже можно прокинуть сюда кастомный обработчик, но нет
            console.warn(event);
        };

        this._request.onsuccess = () => {
            this._db = this._request.result;
            onInited()
        }
    }

    public write(todolist: TodoData[]) {
        if (this._db === null) {
            return
        }

        const transaction = this._db.transaction([this._tableName], "readwrite");
        const store = transaction.objectStore(this._tableName)
  
        for (const item of todolist) {
            store.put(item)
        }
    }

    public getData(): TodoData[] | null {
        if (this._db === null) {
            return null
        }

        const transaction = this._db.transaction([this._tableName], "readwrite");
        const store = transaction.objectStore(this._tableName)
  
        return store.getAll()

    }

}