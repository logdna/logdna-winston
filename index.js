'use strict'

const Transport = require('winston-transport')
const {createLogger} = require('@logdna/logger')
const pkg = require('./package.json')

// Convert between Winston levels and @logdna/logger levels
const levelTranslate = new Map([
  ['error', 'error']
, ['warn', 'warn']
, ['info', 'info']
, ['http', 'debug']
, ['verbose', 'debug']
, ['debug', 'debug']
, ['silly', 'trace']
])
/*
 *  Support for Winston Transport
 */
module.exports = class LogDNATransport extends Transport {
  constructor(options) {
    super(options)

    // Create an instance of @logdna/logger
    this.logger = createLogger(options.key, {
      ...options
    , UserAgent: `${pkg.name}/${pkg.version}`
    })
  }

  log(info, callback) {
    const level = levelTranslate.get(info.level)

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
