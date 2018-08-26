const util = require('util')

// Promisify tcp-ping
const tcpPing = require('tcp-ping');
exports.tcpPing = util.promisify(tcpPing.ping)
exports.tcpProbe = util.promisify(tcpPing.probe)
