// nome da assegnare al campo del evento per memorizzare id risorsa
export const EV_ID_RISORSA = "idRisorsa";
//Lista tutte le risorse
export const LISTA_RISORSE = "risorse";
//Risorse filtrate
export const LISTA_RISORSE_FILTRATA = "risorseFiltrate";

//nome deafult view timeline
export const VIEW_TIMELINE = "timeline";

export const SCALA_MENSILE = 1;
export const SCALA_SETTIMANALE = 2;

export const LISTA_CARICHI = [
  { key: 1, label: "19.1" },
  { key: 2, label: "19.2" },
  { key: 3, label: "19.3" }
];

//Eleno dei valori per filtrare le risorse
//Filtra le macchine in base al valore di key. Confronto label della risorsa con questo valore
export const LISTA_FILTRO_RISORSE = [
  { key: "all", text: "All" },
  { key: "L180", text: "L180" },
  { key: "L232", text: "L232" },
  { key: "L2020", text: "L2020" }
];
