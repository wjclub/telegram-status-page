import sleep from 'sleep-promise';

// Include all checks
const checks = {
  telegraph: require('./checks/telegraph.js'),
  telescope: require('./checks/telescope.js')
};

// Shared status storage
let status = {};


// Loop all checks and pings

async function doPings() {

}
setImmediate(doPings);

s
async function doChecks() {
  const minDelay = 60*1000;
  while(true) {

    const start = Date.now();

    for (let i in checks) {
      
    }

    const end = Date.now() - start;
    await sleep(end > minDelay ? 0 : minDelay - end);

  }
}
setImmediate(doChecks);
