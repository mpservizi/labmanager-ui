import MyDate from 'date-and-time';

export function strToDate(strDate, formato) {
    let data = MyDate.parse(strDate, formato || 'DD/MM/YYYY');
    return data;
}

export function dateToStr(data, formato) {
    let str = MyDate.format(data, formato || 'DD/MM/YYYY');
    return str;
}

/**
 * Restituisce la differenza in giorni tra le date indicate
 * @param {*} start : data inizio
 * @param {*} end : data fine
 */
export function calcolaDifferenzaDateInGiorni(start, end) {
    return Math.floor(MyDate.subtract(end, start).toDays());
}

/**
 * Calcola la data di inizio della settimana
 * @param {*} weekNumber : numero di settimana
 * @param {*} year : anno della settimana
 * @returns {Date} : data di inizio settimana
 */
export function getDateOfWeek(weekNumber, year) {
    var simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;

}
export default {
    strToDate,
    dateToStr,
    calcolaDifferenzaDateInGiorni,
    getDateOfWeek
}
