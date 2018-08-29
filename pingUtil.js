const util = require('util')
const dns = require('dns')
const tcpPing = util.promisify(require('tcp-ping').ping);
const resolve4 = util.promisify(dns.resolve4);




// Promisify tcp-ping
exports.tcpPing = async function({address, port, timeout}) {
  const ipa = (await resolve4(address))[0];

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
