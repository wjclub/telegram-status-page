const pingUtil = require('../pingUtil.js');
//const axios = require('axios');

const domain = 'telesco.pe';
const timeout = 5 * 1000;

exports.ping = async () => {
  return pingUtil.tcpPing({
    address: domain,
    port: 443,
    timeout: timeout
  });
}

const tests = [

]

exports.test = async () => {
  return [];
}