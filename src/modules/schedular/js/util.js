/**
 * Restituisce i giorni del mese della data indicata
 * @param {*} date : data da cui ricavare i giorni del mese
 * @returns
 */
export function getGiorniDelMese(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let d = new Date(year, month, 0);
  let daysInMonth = d.getDate();
  return daysInMonth;
}

/**
 * Genera data casuale tra date indicate
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
