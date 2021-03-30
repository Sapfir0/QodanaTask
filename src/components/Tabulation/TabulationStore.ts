import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { Tabulation } from "typings";



@injectable()
export class TabulationStore {
    public currentTab: number = Tabulation.All
    

    constructor() {
        makeObservable(this, {
            onChange: action,
            currentTab: observable
        })
    }

    public onChange = (event: React.ChangeEvent<{}>, value: number) => {
        this.currentTab = value
    }

}