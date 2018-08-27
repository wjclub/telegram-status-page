const sleep = require('sleep-promise');

// Include all checks
const checks = {
  telegraph: require('./checks/telegraph.js'),
  telescope: require('./checks/telescope.js')
};

// Shared status storage
let status = {};

// Initialize status layout
for (let i in checks) {
  status[i] = {
    ping: {},
    functionality: []
  };
}



// Loop all pings
async function doPings() {
  const minDelay = 10 * 1000;
  while (true) {

    const start = Date.now();

    for (let i in checks) {
      try {
        // Perform functionality tests
        status[i].ping = await checks[i].ping();
      } catch (checkError) {
        console.error('Runner failed to ping', i)
      }
    }

    const end = Date.now() - start;
    await sleep(end > minDelay ? 0 : minDelay - end);

  }
}
setImmediate(doPings);

// Loop all functionality checks
async function doChecks() {
  const minDelay = 60*1000;
  while(true) {

    const start = Date.now();

    for (let i in checks) {
      try {
        // Perform functionality tests
        status[i].functionality = await checks[i].test(); 
      } catch (checkError) {
        console.error('Runner failed to perform functionality tests for',i)
      }
    }

    const end = Date.now() - start;

    // TODO: remove DEBUG info
    console.debug(status.telegraph);

    await sleep(end > minDelay ? 0 : minDelay - end);

  }
}
setImmediate(doChecks);

console.log('Finished initializing...');