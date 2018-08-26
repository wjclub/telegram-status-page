const telegraphCheck = require('./checks/telegraph.js');

(async () => {

  console.debug(await telegraphCheck.ping())

  console.debug(await telegraphCheck.test())


})();