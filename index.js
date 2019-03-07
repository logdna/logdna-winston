const Transport = require('winston-transport');
const Logger = require('logdna').Logger;
const stringify = require('json-stringify-safe');

const DEFAULT_LEVEL = 'debug';
const DEFAULT_NAME = 'LogDNA';
/*
 *  Support for Winston Transport
 */
module.exports = class LogDNATransport extends Transport {
    constructor(options) {
        super(options);
        this.name = options.name || DEFAULT_NAME;
        this.level = options.level || DEFAULT_LEVEL;
        this.logger = new Logger(options.key, options);
        this.index_meta = options.index_meta || false;
    }

    log(info, callback) {
        info = info || {};

        if (info.error instanceof Error) {
            info.error = info.error.stack || info.error.toString();
        }
        if (!info.message) {
            info.message = stringify(info, null, 2, function() { return undefined; });
        }

        const { level, message, index_meta, ...meta } = info;
        const opts = {
            level: level
            , index_meta: typeof info.index_meta === 'boolean' ? index_meta : this.index_meta
            , context: meta || {}
        };
        this.logger.log(message, opts);
        if (callback) { callback(null, true); }
    }
};
