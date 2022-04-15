const graylog2 = require("graylog2");

const logger = new graylog2.graylog({
    servers: [{
        'host': 'graylog',
        port: 12201
    }, ],
    hostname: 'backend', // the name of this host
    // (optional, default: os.hostname())
    facility: 'Node.js', // the facility for these log messages
    // (optional, default: "Node.js")
    bufferSize: 1350 // max UDP packet size, should never exceed the
    // MTU of your system (optional, default: 1400)
});

module.exports = logger;