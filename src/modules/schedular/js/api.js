const URL_RISORSE = "http://localhost:3000/api/planner/risorse";
const URL_CICLATURA = "http://localhost:3000/api/planner/dati_ciclatura";

import { parseEventiServer, parseRisorse } from "./data-parser.js";

/**
 * Carica la liste delle risorse dal server
 * @returns
 */
export async function loadRisorse() {
  let data = await getRequest(URL_RISORSE);
  return parseRisorse(data);
}

/**
 * Carica i dati di ciclatura dal server
 * @returns
 */
export async function loadDatiCiclatura() {
  let data = await getRequest(URL_CICLATURA);
  return parseEventiServer(data);
}

/**
 * Salva gli eventi del schedular sul server
 * @param {*} dati
 * @returns
 */
export async function save(dati) {
  let result = await postRequest(URL_CICLATURA, dati);
  return result;
}

/**
 * Esegue post request al url indicato
 * @param {*} url
 * @param {*} json
 * @returns
 */
async function postRequest(url, json) {
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: json
    });
    return await rawResponse.json();
  } catch (error) {
    return null;
  }
}

/**
 * Esegue get request al url indicato
 * @param {*} url
 * @returns : Json parsed
 */
async function getRequest(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}
