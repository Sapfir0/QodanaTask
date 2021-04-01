import { openDB } from "idb";
import { BarChartData } from "typings";
import { dayOfWeek, format } from "./DateHelper";
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

    public changeTaskStatus = async (tableName: string, newTaskStatus: boolean) => {
        const currentDate = new Date()
        const dateKey = format(currentDate)
        let todayRecord: BarChartData | undefined = undefined
        todayRecord = await this._db?.get(tableName, dateKey)
    
        if (todayRecord === undefined) {
            todayRecord = {value: 0, date: dateKey, dayOfWeek: dayOfWeek[currentDate.getDay()]}
        } 

        const completedTaskCount = newTaskStatus ? todayRecord.value + 1 : todayRecord.value - 1
        this._db?.put(tableName, {...todayRecord, value: Math.max(completedTaskCount, 0) })
    }

    public getNewDataArray = (data: BarChartData[], newTaskStatus: boolean) => {
        const historyIndex = data.findIndex((el) => el.date === format(new Date()))
        const completedTaskCount = data[historyIndex].value
        const newCompletedTaskCount = newTaskStatus ? completedTaskCount + 1 : completedTaskCount - 1

        data[historyIndex].value = Math.max(newCompletedTaskCount, 0)
        return data
    }

    public createDataIfNotExists = async (tableName: string) => {
        const currentDate = new Date()
        
        for (let i=0; i<dayOfWeek.length; i++) {
            const tempDate = new Date();
            tempDate.setDate(currentDate.getDate() - i)

            const dateKey = format(tempDate)
            const todayRecord = await this._db?.get(tableName, dateKey)
            if (todayRecord === undefined) {
                await this._db?.put(tableName, { value: 0, date: dateKey, dayOfWeek: dayOfWeek[tempDate.getDay()]})
            }
        }
    }

    public getAll = async (tableName: string): Promise<BarChartData[]>   => {
        const allRecords = await this._db?.getAll(tableName)
        if (allRecords === undefined) {
            return []
        }
        
        return allRecords.slice(-dayOfWeek.length) // получим 7 последних  записей

    }

}