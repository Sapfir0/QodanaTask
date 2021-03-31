import { initialTododata } from "data";
import { injectable } from "inversify";
import { container } from "inversify/inverisfyContainer";
import { SERVICE_IDENTIFIER } from "inversify/inversifyTypes";
import { action, makeObservable, observable } from "mobx";
import { IndexedDBHelper } from "serivces/IndexedDBHelper";
import { TodoData } from "../../typings";
import { Tabulation } from "../../typings/index";


@injectable()
export class TodoListStore {
    public data: TodoData[] = []
    public currentTab: number = Tabulation.All
    public tabularData = this.data
    public onCreating = false;
    public newTitle = ""
    private _indexedDb: IndexedDBHelper
    private _tableName = "todolist"

    constructor() {
        this._indexedDb = container.get<IndexedDBHelper>(SERVICE_IDENTIFIER.IndexedDBHelper);
        makeObservable(this, {
            data: observable,
            onChangeCheckbox: action,
            onTabChange: action,
            currentTab: observable,
            tabularData: observable,
            onCreating: observable,
            createNewTask: action,
            setCreating: action,
            initDb: action
        })
        this.initDb();
       
    }

    public initDb = async () => {
        await this._indexedDb.init(this._tableName);
        this.data = await this._indexedDb.getData(this._tableName);
        
        if (this.data.length === 0) { // для прода ужасный способ, но решил  тут сделать такое допущение
            this._indexedDb.write( this._tableName, initialTododata)
        }
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
        this.data[dataId].completed = checked
        this._indexedDb.update(this._tableName, this.data[dataId])
        this.onTabChange(this.currentTab)
    }

    public onTypingNewInput = (value: string) => {
        this.newTitle = value
    }

    public setCreating = (state: boolean) => {
        this.onCreating = state
    }

    public createNewTask = () => {
        const newElem = {id: this.data.length + 1, completed: false, title: this.newTitle}
        this.data.push(newElem)
        this.onTabChange(this.currentTab)
        this._indexedDb.write(this._tableName, [newElem])

        this.onCreating = false;
        this.newTitle = ""
    }

    public removeTask = (id: number) => {
        this.data = this.data.filter((el, i) => id !== el.id)
        this._indexedDb.remove(this._tableName, id)
        this.onTabChange(this.currentTab)

    }

}