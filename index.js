'use strict'

const Transport = require('winston-transport')
const {createLogger} = require('@logdna/logger')
const pkg = require('./package.json')

/*
 *  Support for Winston Transport
 */
module.exports = class LogDNATransport extends Transport {
  constructor(options) {
    const {levels, ...opts} = options
    super({
      ...opts
    , levels
    })

    let custom_levels = levels
    if (!custom_levels) {
      // Per the winston docs, their 'npm' levels will be used, and those must be
      // set up as custom levels in LogDNA.
      // @see https://github.com/winstonjs/winston#logging-levels
      custom_levels = {
        error: 0
      , warn: 1
      , info: 2
      , http: 3
      , verbose: 4
      , debug: 5
      , silly: 6
      }
    }
    // Create an instance of @logdna/logger
    this.logger = createLogger(options.key, {
      ...opts
    , levels: Object.keys(custom_levels)
    , UserAgent: `${pkg.name}/${pkg.version}`
    })
  }

  log(info, callback) {
    const level = info.level

    if (info.error instanceof Error) {
      info.error = info.error.stack || info.error.toString()
    }

    if (!info.message) {
      // Send the incoming object payload as the message
      this.logger.log(info, level)
      callback(null, true)
      return
    }

    // eslint-disable-next-line no-unused-vars
    const {level: _, message, indexMeta, timestamp, ...meta} = info
    const opts = {
      level
    , indexMeta
    , timestamp
    , meta
    }

    this.logger.log(message, opts)
    callback(null, true)
  }
}
