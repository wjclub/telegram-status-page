const util = require('util')
const dns = require('dns')
const tcpPing = util.promisify(require('tcp-ping').ping);
const resolve4 = util.promisify(dns.resolve4);




// Promisify tcp-ping
exports.tcpPing = async ({address, port, timeout}) => {
  const ipa = address //await resolve4(adress)
  const pingRes = await tcpPing({
    address: ipa[0],
    port,
    timeout,
    attempts: 5
  });
  return pingRes;
}
