const Transport = require('winston-transport');
const logdna = require('logdna');
const stringify = require('json-stringify-safe');

/*
 *  Support for Winston Transport
 */
module.exports = class LogDNATransport extends Transport {
    constructor(options) {
        super(options);
        this.name = options.name || 'LogDNA';
        this.level = options.level || '';
        this.logger = new logdna.Logger(options.key, options);
        this.index_meta = options.index_meta || false;
    }

    log(info, callback) {
        setImmediate(() => this.emit('logged', info));

        if (info.message instanceof Error) {
            info.error = info.message.stack || info.message.toString();
            info.message = info.message.message;
        }

        if (!info.message) {
            info.message = stringify(info, null, 2, function () { return undefined; });
        }

        const { level, message, index_meta, ...meta } = info;

        const opts = {
            level
            , index_meta: index_meta !== undefined ? index_meta : this.index_meta
            , meta: meta || {}
        };

        this.logger.log(info.message, opts);
        if (callback) { callback(); }
    }

    // make sure all logs are flushed with the Stream closes
    // https://nodejs.org/api/stream.html#stream_writable_final_callback
    _final(cb) {
        logdna.flushAll(cb);
    }
};
