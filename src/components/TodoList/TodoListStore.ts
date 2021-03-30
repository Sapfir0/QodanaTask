import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { TodoData } from "../../typings";
import { Tabulation } from "../../typings/index";

const initialTododata: TodoData[] = [
    {
        // status: 'new',
        id: 0,
        title: 'Задача',
        completed: false
    },
    {
        // status: 'success',
        id: 1,
        completed: true,
        title: 'Первая успешная задача',
    },
];

@injectable()
export class TodoListStore {
    public data = initialTododata
    public currentTab: number = Tabulation.All
    public tabularData = this.data
    public onCreating = false;

    constructor() {
        makeObservable(this, {
            data: observable,
            onChangeCheckbox: action,
            onTabChange: action,
            currentTab: observable,
            tabularData: observable
        })
    }

    public onTabChange = (event: React.ChangeEvent<{}>, value: Tabulation) => {
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
        // this.tabularData[dataId].completed = checked
        this.data[dataId].completed = checked
        this.onTabChange(event, this.currentTab)
        console.log(this.tabularData); 
    }

    public setCreating = (state: boolean) => {
        this.onCreating = state
    }

}