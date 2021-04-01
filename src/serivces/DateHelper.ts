export const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const format = (date: Date) => {
    return new Intl.DateTimeFormat('en-En', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(date);
};
