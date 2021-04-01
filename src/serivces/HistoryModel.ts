import { openDB } from "idb";
import { BarChartData } from "typings";
import { dayOfWeek } from "./DateHelper";
import { IndexedDBHelper } from "./IndexedDBHelper";


export class HistoryModel extends IndexedDBHelper {
    protected _dbName = "history";

    public init = async (tableName: string) => {
        console.log(tableName);
        
        this._db = await openDB(this._dbName, this._version, {
            upgrade(db, oldVersion, newVersion, transaction) {
                db.createObjectStore(tableName, { keyPath: "date" });
            }
        })
    }

    public format(date: Date) {
        return new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric'}).format(date)
    }

    public changeTaskStatus = async (tableName: string, newTaskStatus: boolean) => {
        const currentDate = new Date()
        const dateKey = this.format(currentDate)
        let todayRecord: BarChartData | undefined = undefined
        todayRecord = await this._db?.get(tableName, dateKey)
    
        if (todayRecord === undefined) {
            todayRecord = {id: 1, value: 1, date: dateKey, dayOfWeek: dayOfWeek[currentDate.getDay()]}
        } 
        console.log(todayRecord);
        const completedTaskCount = newTaskStatus ? todayRecord.value + 1 : todayRecord.value - 1
        this._db?.put(tableName, {...todayRecord, value: completedTaskCount})
    
    }

}