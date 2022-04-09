const https = require("https");
const axios = require('axios');

// Storrs campus
// TODO: array of UCONN campus IDs
const UnivId = "1091";

function getQueryURL(UnivId, pageNum=1) {
  return `https://www.ratemyprofessors.com/filter/professor/?&page=${pageNum}&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=${UnivId}`
}

async function getNumProf() {
  try {
    const res = await axios.get(getQueryURL(UnivId));
    return res.data.searchResultsTotal;
  } catch (err) {
    console.error(err);
  }
}

async function getProfData() {
  let numProf = await getNumProf()
  let numPages = Math.ceil(numProf / 20);
  console.log(`numProf: ${numProf}, numPages: ${numPages}`)

  let profData = [];
  let requests = [];
  // setup requests
  for (let i=1; i<numPages; i++) {
    requests[i] = axios.get(getQueryURL(UnivId, i));
  }
  
  try {
    await Promise.all(requests).then((vals) => {
      // do all the promises (much faster that sync)
      for (let i=1; i<numPages; i++) {
        profData = profData.concat(vals[i].data.professors);
      }
    })
    return profData;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getNumProf,
  getProfData,
}
