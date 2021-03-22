/**
 * Dati worload memorizzati in modo semplice. Quelli presenti nel file excel
 */
const datiWorload = [
  {
    'IdRisorsa': 9,
    'Nome': 'L2020 - 1',
    'Week': 'WK09',
    'Carico': 19.1,
    'Giorni': 4,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 10,
    'Nome': 'L2020 - 2',
    'Week': 'WK09',
    'Carico': 19.1,
    'Giorni': 4,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 11,
    'Nome': 'L2020 - 3',
    'Week': 'WK09',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 12,
    'Nome': 'L2020 - 4',
    'Week': 'WK09',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 13,
    'Nome': 'L2020 - 5',
    'Week': 'WK09',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 14,
    'Nome': 'L2020 - 6',
    'Week': 'WK09',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 3,
    'Nome': 'L180 - 8',
    'Week': 'WK10',
    'Carico': 19.1,
    'Giorni': 3,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 4,
    'Nome': 'L180 - 9',
    'Week': 'WK10',
    'Carico': 19.1,
    'Giorni': 3,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 3,
    'Nome': 'L180 - 8',
    'Week': 'WK10',
    'Carico': 19.1,
    'Giorni': 3,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 4,
    'Nome': 'L180 - 9',
    'Week': 'WK10',
    'Carico': 19.1,
    'Giorni': 3,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 1,
    'Nome': 'L180 - 6',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 2,
    'Nome': 'L180 - 7',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 5,
    'Nome': 'L232 - 6',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 6,
    'Nome': 'L232 - 7',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 7,
    'Nome': 'L232 - 8',
    'Week': 'WK10',
    'Carico': 19.2,
    'Giorni': 6,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 8,
    'Nome': 'L232 - 9',
    'Week': 'WK10',
    'Carico': 19.2,
    'Giorni': 6,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 9,
    'Nome': 'L2020 - 1',
    'Week': 'WK10',
    'Carico': 19.1,
    'Giorni': 7,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 10,
    'Nome': 'L2020 - 2',
    'Week': 'WK10',
    'Carico': 19.1,
    'Giorni': 7,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 11,
    'Nome': 'L2020 - 3',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 7,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 12,
    'Nome': 'L2020 - 4',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 7,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 13,
    'Nome': 'L2020 - 5',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 5,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 14,
    'Nome': 'L2020 - 6',
    'Week': 'WK10',
    'Carico': 19.3,
    'Giorni': 5,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 1,
    'Nome': 'L180 - 6',
    'Week': 'WK11',
    'Carico': 19.3,
    'Giorni': 2,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 2,
    'Nome': 'L180 - 7',
    'Week': 'WK11',
    'Carico': 19.3,
    'Giorni': 2,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 3,
    'Nome': 'L180 - 8',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 1,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 4,
    'Nome': 'L180 - 9',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 1,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 5,
    'Nome': 'L232 - 6',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 2,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 6,
    'Nome': 'L232 - 7',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 2,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 7,
    'Nome': 'L232 - 8',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 2,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 8,
    'Nome': 'L232 - 9',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 2,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 9,
    'Nome': 'L2020 - 1',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 1,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 10,
    'Nome': 'L2020 - 2',
    'Week': 'WK11',
    'Carico': 19.1,
    'Giorni': 1,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 11,
    'Nome': 'L2020 - 3',
    'Week': 'WK11',
    'Carico': 19.3,
    'Giorni': 2,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 12,
    'Nome': 'L2020 - 4',
    'Week': 'WK11',
    'Carico': 19.3,
    'Giorni': 2,
    'IdRichiesta': 1
  },
  {
    'IdRisorsa': 5,
    'Nome': 'L232 - 6',
    'Week': 'WK11',
    'Carico': 19.2,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 6,
    'Nome': 'L232 - 7',
    'Week': 'WK11',
    'Carico': 19.2,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 7,
    'Nome': 'L232 - 8',
    'Week': 'WK11',
    'Carico': 19.2,
    'Giorni': 4,
    'IdRichiesta': 2
  },
  {
    'IdRisorsa': 8,
    'Nome': 'L232 - 9',
    'Week': 'WK11',
    'Carico': 19.2,
    'Giorni': 4,
    'IdRichiesta': 2
  }
];

export function getWorloadDati(){
    // let json = JSON.stringify(datiWorload);
    // let dati = JSON.parse(json);
    return datiWorload;
}