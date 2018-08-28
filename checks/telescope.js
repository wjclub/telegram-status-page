const pingUtil = require('../pingUtil.js');
//const axios = require('axios');

const domain = 'telesco.pe';
const timeout = 5 * 1000;

exports.ping = async () => {
  try {
    const pingResponse = await pingUtil.tcpPing({
      address: domain,
      port: 443,
      timeout: timeout
    });

    return {
      ok: true,
      ping: pingResponse.avg,
      ipv4: pingResponse.ipv4,
      date: Date.now()
    };

  } catch (pingError) {
    return {
      ok: false,
      ping: timeout,
      ipv4: pingResponse.ipv4,
      date: Date.now()
    };
  }
}

const tests = [

]

exports.test = async () => {
  return [];
}