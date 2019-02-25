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

    log(info, callback) {
        setImmediate(() => this.emit('logged', info));

        if (info instanceof Error) {
            info = {
                message: info.message
                , level: 'error'
                , error: info.stack || info.toString()
            };
        }

        if (!info.message) {
            info.message = stringify(info, null, 2, function () { return undefined; });
        }

        const { level, message, ...meta } = info;
        const opts = {
            level: info.level
            , index_meta: info.index_meta || this.index_meta
            , context: meta || {}
        };

        this.logger.log(info.message, opts);
        if (callback) { callback(); }
    }
};
