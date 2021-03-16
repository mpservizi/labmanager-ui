//macchine
const L180 = {
  idMacchina: 1,
  nome: "L180",
  stalli: [{ num: "6" }, { num: "7" }, { num: "8" }, { num: "9" }]
};
const L232 = {
  idMacchina: 2,
  nome: "L232",
  stalli: [{ num: "6" }, { num: "7" }, { num: "8" }, { num: "9" }]
};
const L2020 = {
  idMacchina: 3,
  nome: "L2020",
  stalli: [
    { num: "1" },
    { num: "2" },
    { num: "3" },
    { num: "4" },
    { num: "5" },
    { num: "6" }
  ]
};

function getRisorse() {
  let macchine = [L180, L232, L2020];
  let lista = [];
  let cont = 1;
  macchine.forEach(macchina => {
    macchina.stalli.forEach(stallo => {
      let record = {
        key: cont, //id risorsa
        label: macchina.nome,
        idMacchina: macchina.idMacchina,
        stallo: parseInt(stallo.num)
      };
      lista.push(record);
      cont++;
    });
  });
  return lista;
}

module.exports = {
  getRisorse
};
