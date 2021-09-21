'use strict'

const {test} = require('tap')
const nock = require('nock')
const winston = require('winston')
const logdnaWinston = require('../index.js')

nock.disableNetConnect()

test('Call .log() with an object and indexMeta: true', (t) => {
  const logger = winston.createLogger()
  const timestamp = Date.now()
  const message = 'Log from LogDNA-winston'
  const error = new Error('BOOM, FAKE ERROR')

  const meta = {
    data: 'Some meta information'
  , bool: true
  , num: 3587
  }

  const options = {
    key: 'abc123'
  , hostname: 'My-Host'
  , ip: '192.168.2.100'
  , mac: '9e:a0:f8:20:86:3d'
  , url: 'http://localhost:35870'
  , app: 'LogDNA'
  }

  logger.add(new logdnaWinston(options))

  t.plan(2)
  t.on('end', async () => {
    nock.cleanAll()
  })

  nock(options.url)
    .post('/', (body) => {
      const payload = body.ls[0]
      t.same(payload, {
        timestamp
      , line: message
      , level: 'INFO'
      , app: options.app
      , meta: {
          ...meta
        , error: error.stack
        }
      }, 'Options were successfully placed into the message')
      return true
    })
    .query((q) => {
      t.match(q, {
        now: /^\d+$/
      , hostname: 'My-Host'
      , mac: '9e:a0:f8:20:86:3d'
      , ip: '192.168.2.100'
      , tags: ''
      }, 'LogDNA logger query string is correct')
      return true
    })
    .reply(200, 'Ingester response')

  logger.log({
    message
  , level: 'info'
  , indexMeta: true
  , data: meta.data
  , bool: meta.bool
  , num: meta.num
  , error
  , timestamp
  })
})

test('Call .info() with simple string', (t) => {
  const logger = winston.createLogger()
  const message = 'Log from LogDNA-winston'

  const options = {
    key: 'abc123'
  , hostname: 'My-Host'
  , ip: '192.168.2.100'
  , mac: '9e:a0:f8:20:86:3d'
  , url: 'http://localhost:35870'
  , app: 'LogDNA'
  }

  logger.add(new logdnaWinston(options))

  t.plan(2)
  t.on('end', async () => {
    nock.cleanAll()
  })

  nock(options.url)
    .post('/', (body) => {
      const payload = body.ls[0]
      t.match(payload, {
        timestamp: Number
      , line: message
      , level: 'INFO'
      , app: options.app
      , meta: '{}' // indexMeta is `false`, so it's stringified
      }, 'Options were successfully placed into the message')
      return true
    })
    .query((q) => {
      t.match(q, {
        now: /^\d+$/
      , hostname: 'My-Host'
      , mac: '9e:a0:f8:20:86:3d'
      , ip: '192.168.2.100'
      , tags: ''
      }, 'LogDNA logger query string is correct')
      return true
    })
    .reply(200, 'Ingester response')

  logger.info(message)
})

test('Call .log() with a message object', (t) => {
  const logger = winston.createLogger({
    level: 'silly' // Log less than or equal to this
  })
  const message = {
    msg: 'Log from LogDNA-winston'
  , key: 'value'
  , bool: true
  , level: 'warn'
  }

  const options = {
    key: 'abc123'
  , hostname: 'My-Host'
  , ip: '192.168.2.100'
  , mac: '9e:a0:f8:20:86:3d'
  , url: 'http://localhost:35870'
  , app: 'LogDNA'
  }

  logger.add(new logdnaWinston(options))

  t.plan(2)
  t.on('end', async () => {
    nock.cleanAll()
  })

  nock(options.url)
    .post('/', (body) => {
      const payload = body.ls[0]
      t.match(payload, {
        timestamp: Number
      , line: JSON.stringify(message)
      , level: 'WARN'
      , app: options.app
      , meta: '{}' // indexMeta is `false`, so it's stringified
      }, 'Options were successfully placed into the message')
      return true
    })
    .query((q) => {
      t.match(q, {
        now: /^\d+$/
      , hostname: 'My-Host'
      , mac: '9e:a0:f8:20:86:3d'
      , ip: '192.168.2.100'
      , tags: ''
      }, 'LogDNA logger query string is correct')
      return true
    })
    .reply(200, 'Ingester response')

  logger.log(message)
})

test('Call .log() with a message payload and custom level', (t) => {
  const levels = {
    error: 0
  , warn: 1
  , info: 2
  , http: 3
  , verbose: 4
  , loquacious: 5
  , ludicrous: 6
  }
  const logger = winston.createLogger({
    levels
  , level: 'ludicrous' // needed, or else it won't log levels <= to 'info'
  })

  const logdna_options = {
    key: 'abc123'
  , hostname: 'My-Host'
  , ip: '192.168.2.100'
  , mac: '9e:a0:f8:20:86:3d'
  , url: 'http://localhost:35870'
  , app: 'LogDNA'
  , levels
  }
  logger.add(new logdnaWinston(logdna_options))

  t.plan(2)
  t.on('end', async () => {
    nock.cleanAll()
  })

  const message = {
    msg: 'Custom level log message'
  , key: 'value'
  , bool: true
  , level: 'ludicrous'
  }

  nock(logdna_options.url)
    .post('/', (body) => {
      const payload = body.ls[0]
      t.match(payload, {
        timestamp: Number
      , line: JSON.stringify(message)
      , level: 'LUDICROUS'
      , app: logdna_options.app
      , meta: '{}' // indexMeta is `false`, so it's stringified
      }, 'Options were successfully placed into the message')
      return true
    })
    .query((q) => {
      t.match(q, {
        now: /^\d+$/
      , hostname: 'My-Host'
      , mac: '9e:a0:f8:20:86:3d'
      , ip: '192.168.2.100'
      , tags: ''
      }, 'LogDNA logger query string is correct')
      return true
    })
    .reply(200, 'Ingester response')

  logger.ludicrous(message)
})

test('Error will still be processed if there is no stack trace', (t) => {
  const logger = winston.createLogger()
  const timestamp = Date.now()
  const message = 'Log from LogDNA-winston'

  t.teardown(() => {
    Error.stackTraceLimit = 10
  })

  Error.stackTraceLimit = false
  const error = new Error('BOOM, FAKE ERROR')

  const options = {
    key: 'abc123'
  , hostname: 'My-Host'
  , ip: '192.168.2.100'
  , mac: '9e:a0:f8:20:86:3d'
  , url: 'http://localhost:35870'
  , app: 'LogDNA'
  }

  logger.add(new logdnaWinston(options))

  t.plan(2)
  t.on('end', async () => {
    nock.cleanAll()
  })

  nock(options.url)
    .post('/', (body) => {
      const payload = body.ls[0]
      t.same(payload, {
        timestamp
      , line: error.message
      , level: 'ERROR'
      , app: options.app
      , meta: {
          error: error.toString()
        }
      }, 'Options were successfully placed into the message')
      return true
    })
    .query((q) => {
      t.match(q, {
        now: /^\d+$/
      , hostname: 'My-Host'
      , mac: '9e:a0:f8:20:86:3d'
      , ip: '192.168.2.100'
      , tags: ''
      }, 'LogDNA logger query string is correct')
      return true
    })
    .reply(200, 'Ingester response')

  logger.log({
    message
  , level: 'error'
  , message: error.message
  , timestamp
  , indexMeta: true
  , error
  })
})

test('If no "levels", then use winston defaults and pass LogDNA custom levels', (t) => {
  const logger = winston.createLogger()

  const logdna_options = {
    key: 'abc123'
  , hostname: 'My-Host'
  , ip: '192.168.2.100'
  , mac: '9e:a0:f8:20:86:3d'
  , url: 'http://localhost:35870'
  , app: 'LogDNA'
  , level: 'silly' // Required for this test since 'info' is the max log level by default
  }
  logger.add(new logdnaWinston(logdna_options))

  t.plan(4)
  t.on('end', async () => {
    nock.cleanAll()
  })

  nock(logdna_options.url)
    .post('/', (body) => {
      for (const {level} of body.ls) {
        switch (level) {
          case 'ERROR':
          case 'INFO':
          case 'VERBOSE':
          case 'SILLY':
            t.pass(`${level} level received`)
            continue
          default:
            t.fail(`${level} is not configured for this test`)
        }
      }
      return true
    })
    .query(() => {
      return true
    })
    .reply(200, 'Ingester response')

  logger.error('This is an error')
  logger.info('This is an info')
  logger.verbose('This is verbose, which is supported via LogDNA custom levels')
  logger.silly('This is silly, which is supported via LogDNA custom levels')
})
