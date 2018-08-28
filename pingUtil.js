const util = require('util')
const dns = require('dns')
const tcpPing = util.promisify(require('tcp-ping').ping);
const resolve4 = util.promisify(dns.resolve4);




// Promisify tcp-ping
exports.tcpPing = async function({address, port, timeout}) {
  const ipa = (await resolve4(address))[0];
  const pingRes = await tcpPing({
    address: ipa,
    port,
    timeout,
    attempts: 3
  });
  pingRes.ipv4 = ipa;
  return pingRes;
}
