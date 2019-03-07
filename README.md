<p align="center">
  <a href="https://app.logdna.com">
    <img height="95" width="201" src="https://raw.githubusercontent.com/logdna/artwork/master/logo%2Bnode.png">
  </a>
  <p align="center">Node.js Winston library for logging to <a href="https://app.logdna.com">LogDNA</a></p>
</p>

[![Build Status](https://travis-ci.org/logdna/logdna-bunyan.svg?branch=master)](https://travis-ci.org/logdna/logdna-bunyan)

---

* **[Install](#install)**
* **[API](#api)**
* **[Winston Transport](#winston-transport)**
* **[License](#license)**


## Install

```javascript
$ npm install --save logdna-winston
```

## API

Please see the [logdna](https://github.com/logdna/nodejs/) npm module for the API.

## Winston Transport

This module also provides a transport object, which can be added to winston using:

```javascript
const logdnaWinston = require('logdna-winston');
const winston = require('winston');
const logger = winston.createLogger({});
const options = {
    key: apikey,
    hostname: myHostname,
    ip: ipAddress,
    mac: macAddress,
    app: appName,
    env: envName,
    level: level, // Default to debug, maximum level of log, doc: https://github.com/winstonjs/winston#logging-levels
    index_meta: true // Defaults to false, when true ensures meta object will be searchable
};

// Only add this line in order to track exceptions
options.handleExceptions = true;

logger.add(new logdnaWinston(options));


// log with meta
logger.log({
    level: 'info'
    , message: 'Log from LogDNA-winston'
    , index_meta: true // Ignore this if you would like to use default setting
    , data:'Some information' //  Properties besides level, message and index_meta are considered as "meta"
    , error: new Error("It's a trap.") // Transport will parse the error object under property 'error'
});

// log without meta
logger.info('Info: Log from LogDNA-winston');
```

## License

MIT © [LogDNA](https://logdna.com/)

*Happy Logging!*
