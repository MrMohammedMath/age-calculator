export interface IDate {
    year: number;
    month: number;
    day: number;
}

export function getAge(dateString: IDate): IDate {
    var now = new Date();
    var birthdate = new Date(formatDate(dateString));
    var age = now.getFullYear() - birthdate.getFullYear();
    var m = now.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthdate.getDate())) {
        age--;
        m += 12;
    }
    var d = now.getDate() - birthdate.getDate();
    if (d < 0) {
        d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        m--;
    }
    return { year: age, month: m, day: d };
}

export function formatDate(date: IDate): string {
    const year = date.year.toString();
    const month = date.month.toString().length === 1 ? `0${date.month.toString()}` : date.month.toString();
    const day = date.day.toString().length === 1 ? `0${date.day.toString()}` : date.day.toString();
    return `${year}-${month}-${day}`;
}