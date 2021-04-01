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
        return new Intl.DateTimeFormat('en-En', { year: 'numeric', month: 'numeric', day: 'numeric'}).format(date)
    }

    public changeTaskStatus = async (tableName: string, newTaskStatus: boolean) => {
        const currentDate = new Date()
        const dateKey = this.format(currentDate)
        let todayRecord: BarChartData | undefined = undefined
        todayRecord = await this._db?.get(tableName, dateKey)
    
        if (todayRecord === undefined) {
            todayRecord = {value: 0, date: dateKey, dayOfWeek: dayOfWeek[currentDate.getDay()]}
        } 

        const completedTaskCount = newTaskStatus ? todayRecord.value + 1 : todayRecord.value - 1
        this._db?.put(tableName, {...todayRecord, value: Math.max(completedTaskCount, 0) })
    
    }

    public chageTaskStatusWithoutDB = (data: BarChartData[], newTaskStatus: boolean) => {
        const historyIndex = data.findIndex((el) => el.date === this.format(new Date()))
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

            const dateKey = this.format(tempDate)
            const todayRecord = await this._db?.get(tableName, dateKey)
            if (todayRecord === undefined) {
                await this._db?.put(tableName, { value: 0, date: dateKey, dayOfWeek: dayOfWeek[tempDate.getDay()]})
            }
        }
    }

    public getAll = async (tableName: string): Promise<BarChartData[]>   => {
        const result = await this._db?.getAll(tableName)
        if (result === undefined) {
            return []
        }
        
        return result.slice(-dayOfWeek.length)

    }

}