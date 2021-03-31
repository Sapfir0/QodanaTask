import { initialTododata } from "data";
import { injectable } from "inversify";
import { SERVICE_IDENTIFIER } from "inversify/inversifyTypes";
import { action, makeObservable, observable } from "mobx";
import { inject } from "inversify";
import { IndexedDBHelper } from "serivces/IndexedDBHelper";
import { TodoData } from "../../typings";
import { Tabulation } from "../../typings/index";
import { container } from "inversify/inverisfyContainer";


@injectable()
export class TodoListStore {
    public data: TodoData[] = []
    public currentTab: number = Tabulation.All
    public tabularData = this.data
    public onCreating = false;
    public newTitle = ""
    private _indexedDb: IndexedDBHelper

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
            setCreating: action
        })

        this._indexedDb.init(() => {
            this._indexedDb.write(initialTododata) 
            this.data = this._indexedDb.getData()
        })
        
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
        this.onTabChange(this.currentTab)
    }

    public onTypingNewInput = (value: string) => {
        this.newTitle = value
    }

    public setCreating = (state: boolean) => {
        this.onCreating = state
    }

    public createNewTask = () => {
        this.data.push({id: this.data.length + 1, completed: false, title: this.newTitle})
        this.onTabChange(this.currentTab)

        this.onCreating = false;
        this.newTitle = ""
    }

    public removeTask = (id: number) => {
        this.data = this.data.filter((el, i) => id !== i)
        this.onTabChange(this.currentTab)
    }

}