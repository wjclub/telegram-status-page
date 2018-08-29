const util = require('util')
const dns = require('dns')
const tcpPing = util.promisify(require('tcp-ping').ping);
const resolve4 = util.promisify(dns.resolve4);




/**
 * Ping a TCP port on a host by it's dns name, ipv4 or ipv6 address
 * @param {object} options
 * @param {string} options.address The host's DNS entry
 * @param {string} options.ipv4 The host's ipv4 address
 * @param {string} options.ipv6 The host's ipv6 address
 * @param {number} options.port The TCP port to ping
 * @param {number} options.timeout Ping timeout in ms
 * @returns Info about the ping
 */
exports.tcpPing = async function({address, ipv4, ipv6, port, timeout}) {
  const ipa = ipv4 || ipv6 || (await resolve4(address))[0];

  try {
    const pingResponse = await tcpPing({
      address: ipa,
      port,
      timeout,
      attempts: 3
    });
    pingResponse.ipv4 = ipa;

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
