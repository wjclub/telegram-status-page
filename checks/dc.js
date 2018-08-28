const pingUtil = require('../pingUtil.js');

const timeout = 5 * 1000;


const dcs = [
  {
    ipv4: '149.154.167.50',
    ipv6: '2001:b28:f23d:f001::a',
    location: ''
  },
  {
    ipv4: '149.154.167.51',
    ipv6: '2001:067c:04e8:f002::a',
    location: 'Amsterdam, NL'
  },
  {
    ipv4: '149.154.175.100',
    ipv6: '2001:b28:f23d:f003::a',
    location: 'Miami, US (Level3 Colocation?)'
  }
]


exports.ping = async (ipv4) => {
  try {
    const pingResponse = await pingUtil.tcpPing({
      address: ipv4,
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