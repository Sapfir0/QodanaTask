import { injectable } from "inversify";
import { container } from "inversify/inverisfyContainer";
import { SERVICE_IDENTIFIER } from "inversify/inversifyTypes";
import { action, makeObservable, observable } from "mobx";
import { HistoryModel } from "serivces/HistoryModel";
import { TodoListModel } from "serivces/TodoListModel";
import { BarChartData, TodoData } from "../../typings";
import { Tabulation } from "../../typings/index";


@injectable()
export class TodoListStore {
    public data: TodoData[] = []
    public currentTab: Tabulation = Tabulation.All
    public tabularData = this.data
    public onCreating = false;
    public newTitle = ""
    private _todoDB: TodoListModel
    private _historyDB: HistoryModel
    public historyData: BarChartData[] = []

    private _tableNameList = "todolist"
    protected _tableNameHistory = "history";
    
    constructor() {
        this._todoDB = container.get<TodoListModel>(SERVICE_IDENTIFIER.TodoListModel);
        this._historyDB = container.get<HistoryModel>(SERVICE_IDENTIFIER.HistoryModel);

        makeObservable(this, {
            data: observable,
            onChangeCheckbox: action,
            onTabChange: action,
            currentTab: observable,
            tabularData: observable,
            onCreating: observable,
            createNewTask: action,
            setCreating: action,
            initDb: action,
            historyData: observable,
            updateHistoryData: action
        })
        this.initDb();
       
    }


    public initDb = async () => {
        await Promise.all([
            this._todoDB.init(this._tableNameList),
            this._historyDB.init(this._tableNameHistory), 
        ])

        await this._historyDB.createDataIfNotExists(this._tableNameHistory)

        const [data, history] = await Promise.all([
            this._todoDB.getData(this._tableNameList),
            this._historyDB.getAll(this._tableNameHistory)
         ])
        this.data = data
        this.historyData = history

        this.onTabChange(this.currentTab)
    }

    public onTabChange = (value: Tabulation) => {
        this.currentTab = value
        
        if (value === Tabulation.All) {
            this.tabularData = this.data
        } else if (value === Tabulation.New) {
            this.tabularData = this.data.filter((el) => el.completed === false )
        } else if (value === Tabulation.Completed){
            this.tabularData = this.data.filter((el) => el.completed === true )
        }
    }

    public onChangeCheckbox = (dataId: number) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const index = this.data.findIndex((el) => el.id === dataId)
        this.data[index].completed = checked
        this._todoDB.update(this._tableNameList, this.data[index])

        this._historyDB.changeTaskStatus(this._tableNameHistory, checked)
        this.onTabChange(this.currentTab)
        
        this.updateHistoryData(checked)
    }

    public updateHistoryData = (checked: boolean) => {
        this.historyData = [...this._historyDB.getNewDataArray(this.historyData, checked)]
    }

    public onTypingNewInput = (value: string) => {
        this.newTitle = value
    }

    public setCreating = (state: boolean) => {
        this.onCreating = state
    }

    public createNewTask = () => {
        const maxId = Math.max(...this.data.map((el) => el.id))
        const newElem = {id: maxId + 1, completed: false, title: this.newTitle}
        this.data.push(newElem)
        this.onTabChange(this.currentTab)
        this._todoDB.write(this._tableNameList, [newElem])

        this.onCreating = false;
        this.newTitle = ""
    }

    public removeTask = (id: number) => {
        this.data = this.data.filter((task) => id !== task.id)
        this._todoDB.remove(this._tableNameList, id)
        this.onTabChange(this.currentTab)

    }

    public loadFile = (todolist: TodoData[]) => {
        this.data = todolist
        this.onTabChange(this.currentTab)     
        const clearAll = true
        this._todoDB.write(this._tableNameList, todolist, clearAll);
    }

}