import { BarChartData } from "typings";

export const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const getChartData = (): BarChartData[] => {
    const curDate = new Date();
    
    const data: BarChartData[] = [];
    
    for (let i = 0; i < dayOfWeek.length; i++) {
        const tempDate = new Date();
        tempDate.setDate(curDate.getDate() - i)
        data.push({id: i, date: tempDate, dayOfWeek: dayOfWeek[tempDate.getDay()], value: i})
    }
    return data
}
