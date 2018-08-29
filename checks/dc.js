const pingUtil = require('../pingUtil.js');

const timeout = 5 * 1000;

/**
 * List of current Telegram Data Centres
 */
const dcs = [
  {
    ipv4: '149.154.167.50',
    ipv6: '2001:b28:f23d:f001::a',
    location: 'DC1 - Amsterdam, NL'
  },
  {
    ipv4: '149.154.167.51',
    ipv6: '2001:067c:04e8:f002::a',
    location: 'DC2 - Amsterdam, NL'
  },
  {
    ipv4: '149.154.175.100',
    ipv6: '2001:b28:f23d:f003::a',
    location: 'DC3 - Miami, US (Level3 Colocation)'
  },
  {
    ipv4: '149.154.167.91',
    ipv6: '2001:67c:4e8:f004::a',
    location: 'DC4 - Amsterdam, NL?'
  },
  {
    ipv4: '149.154.171.5',
    ipv6: '2001:b28:f23f:f005::a',
    location: 'DC5 - Singapore'
  }
]
exports.dcs = dcs;

/**
 * Checks a Telegram DC for availability
 * @param {string} ipv4 IP address of the dc to ping
 */
exports.ping = async (ipv4) => {
  return pingUtil.tcpPing({
    ipv4,
    port: 443,
    timeout: 7500
  });
}