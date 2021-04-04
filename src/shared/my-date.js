// import MyDate from 'date-and-time';
import moment from 'moment';

function strToDate(strDate, formato) {
    // let data = MyDate.parse(strDate, formato || 'DD/MM/YYYY');
    let data=moment(strDate,formato || 'DD/MM/YYYY')
    return data;
}

function dateToStr(data, formato) {
    // let str = MyDate.format(data, formato || 'DD/MM/YYYY');
    let str = moment(data).format(formato || 'DD/MM/YYYY')
    return str;
}

/**
 * Converte testo in formato di data usato dal Server
 * @param {*} strDate 
 */
function strToDateServer(strDate){
    let data = moment(strDate).toDate();
    return data;
}
/**
 * Converte data in formato di testo usato dal server
 * @param {*} data 
 * @returns 
 */
function dateToStrServer(data){
    let str = moment(data).format();
    return str;
}
/**
 * Restituisce la differenza in giorni tra le date indicate
 * @param {*} start : data inizio
 * @param {*} end : data fine
 */
function calcolaDifferenzaDateInGiorni(start, end) {
    let giorni = moment(end).diff(moment(start), 'days');
    return giorni;
}

/**
 * Calcola la data di inizio della settimana
 * @param {*} weekNumber : numero di settimana
 * @param {*} year : anno della settimana
 * @returns {Date} : data di inizio settimana
 */
function getDateOfWeek(weekNumber, year) {
    var simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}
function getWeekNumber(data) {
    let week = moment(data).isoWeek();
    return week;
}
export default {
    strToDate,
    dateToStr,
    strToDateServer,
    dateToStrServer,
    calcolaDifferenzaDateInGiorni,
    getWeekNumber,
    getDateOfWeek
};
