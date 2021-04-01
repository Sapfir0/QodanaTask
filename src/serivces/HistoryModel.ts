import { openDB } from 'idb';
import { BarChartData } from 'typings';
import { dayOfWeek, format } from './DateHelper';
import { IndexedDBHelper } from './IndexedDBHelper';

export class HistoryModel extends IndexedDBHelper<BarChartData> {
    protected _dbName = 'history';

    public init = async (tableName: string) => {
        this._db = await openDB(this._dbName, this._version, {
            upgrade(db, oldVersion, newVersion, transaction) {
                db.createObjectStore(tableName, { keyPath: 'date' });
            },
        });
    };

    public getDefaultHistoryRecord = (date: Date): BarChartData => {
        return { value: 0, date: format(date), dayOfWeek: dayOfWeek[date.getDay()] };
    };

    public changeTaskStatus = async (tableName: string, newTaskStatus: boolean) => {
        const currentDate = new Date();

        let todayRecord: BarChartData | undefined = await this._db?.get(tableName, format(currentDate));

        if (todayRecord === undefined) {
            todayRecord = this.getDefaultHistoryRecord(currentDate);
        }

        const completedTaskCount = newTaskStatus ? todayRecord.value + 1 : todayRecord.value - 1;
        this._db?.put(tableName, { ...todayRecord, value: Math.max(completedTaskCount, 0) });
    };

    public getNewDataArray = (data: BarChartData[], newTaskStatus: boolean) => {
        const newData = [...data];
        const historyIndex = newData.findIndex((task) => task.date === format(new Date()));
        const completedTaskCount = newData[historyIndex].value;
        const newCompletedTaskCount = newTaskStatus ? completedTaskCount + 1 : completedTaskCount - 1;

        newData[historyIndex].value = Math.max(newCompletedTaskCount, 0);
        return newData;
    };

    public createDataIfNotExists = async (tableName: string) => {
        const currentDate = new Date();

        for (let day = 0; day < dayOfWeek.length; day++) {
            const tempDate = new Date();
            tempDate.setDate(currentDate.getDate() - day);

            const dateKey = format(tempDate);
            const todayRecord = await this._db?.get(tableName, dateKey);
            if (todayRecord === undefined) {
                await this._db?.put(tableName, this.getDefaultHistoryRecord(tempDate));
            }
        }
    };

    public getAll = async (tableName: string): Promise<BarChartData[]> => {
        const allRecords = await this._db?.getAll(tableName);
        if (allRecords === undefined) {
            return [];
        }

        return allRecords.slice(-dayOfWeek.length); // получим 7 последних  записей
    };
}
