const https = require('https')
const api = require('./api.js')

// api.getNumProf();
// api.getProfData().then(profData => {
  // console.log(profData);
// })

const getRaw = () => {
  return api.getProfData();
}
const getNum = () => {
  return api.getNumProf();
}

module.exports = {
  getRaw,
  getNum
};
