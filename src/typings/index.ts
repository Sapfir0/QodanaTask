export type Status = 'success' | 'new';

export type TodoData = {
    // status: Status;
    id: number
    completed: boolean
    title: string;
};

export enum Tabulation {
    All=0,
    New=1,
    Completed=2
}

export type BarChartData = {
    id: number
    value: number
    dayOfWeek: string
    date: Date
}