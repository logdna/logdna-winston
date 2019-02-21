const Transport = require('winston-transport');
const Logger = require('logdna').Logger;
const stringify = require('json-stringify-safe');

/*
 *  Support for Winston Transport
 */
module.exports = class LogDNATransport extends Transport {
    constructor(options) {
        super(options);
        this.name = options.name || 'LogDNA';
        this.level = options.level || '';
        this.logger = new Logger(options.key, options);
        this.index_meta = options.index_meta || false;
    }

    log(level, msg, meta, callback) {
        if (meta instanceof Error) { meta = { error: meta.stack || meta.toString() }; }

        if (!msg && !(Object.keys(meta).length === 0 && meta.constructor === Object)) {
            msg = stringify(meta, null, 2, function() { return undefined; });
        }
        meta = meta || {};
        let opts = {
            level: level
            , index_meta: meta.index_meta || this.index_meta
            , context: meta
        };
        this.logger.log(msg, opts);
        if (callback) { callback(null, true); }
    }
};

