const telegraphCheck = require('./checks/telegraph.js');
const tgdc = require('./checks/dc.js');

(async () => {

  for (let dc of tgdc.dcs)
    console.log(dc.location,await tgdc.ping(dc.ipv4));



})();