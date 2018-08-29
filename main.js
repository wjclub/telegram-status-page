const sleep = require('sleep-promise');

// Include all checks
const checks = {
  telegraph: require('./checks/telegraph.js'),
  telescope: require('./checks/telescope.js')
};
const dcs = require('./checks/dc.js')

// Shared status storage
let status = {dcs: [], services: {}};

// Initialize status layout
for (let i in checks) {
  status.services[i] = {
    ping: {},
    functionality: []
  };
}
status.dcs = dcs.dcs.map(e=>{
  return {
    ping: { },
    functionality: [],
    location: e.location
  };
});




// Loop all pings
async function doPings() {
  const minDelay = 15 * 1000;
  while (true) {

    const start = Date.now();

    // Ping services
    for (let i in checks) {
      try {
        // Perform functionality tests
        status.services[i].ping = await checks[i].ping();
      } catch (checkError) {
        console.error('Runner failed to ping', i)
      }
    }

    // Ping dcs
    for (let i in dcs.dcs) {
      try {
        // Perform functionality tests
        status.dcs[i].ping = await dcs.ping(dcs.dcs[i].ipv4);
      } catch (checkError) {
        console.error('Runner failed to ping dc', i+1)
      }
    }

    const end = Date.now() - start;
    await sleep(end > minDelay ? 0 : minDelay - end);

  }
} setImmediate(doPings);


// Loop all functionality checks
async function doChecks() {
  const minDelay = 60*1000;
  while(true) {

    const start = Date.now();

    for (let i in checks) {
      try {
        // Perform functionality tests
        status.services[i].functionality = await checks[i].test(); 
      } catch (checkError) {
        console.error('Runner failed to perform functionality tests for',i)
      }
    }

    const end = Date.now() - start;
    await sleep(end > minDelay ? 0 : minDelay - end);

  }
} setImmediate(doChecks);



// HTTP API
const package = require('./package.json');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  res.redirect(package.homepage);
})

app.get('/api/v1/all', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(status)
})

app.get('/api/v1/dcs', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(status.dcs)
})

app.get('/api/v1/services', async (req, res) => {
  res.setHeader('Content-Type','application/json')
  res.json(status.services)
})

app.listen(8080);




console.log('Finished initializing...');