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
    index_meta: true // Defaults to false, when true ensures meta object will be searchable
};

// Only add this line in order to track exceptions
options.handleExceptions = true;

logger.add(new logdnaWinston(options));

let meta = {
    data:'Some information'
};
logger.log('info', 'Log from LogDNA-winston', meta);
logger.log('debug', 'Log from LogDNA-winston', meta);
logger.log('warn', 'Log from LogDNA-winston', meta);
logger.log('error', 'Log from LogDNA-winston', meta);
logger.info('Info: Log from LogDNA-winston', meta);
logger.warn('Warn: Log from LogDNA-winston', meta);
logger.error('Error: Log from LogDNA-winston', meta);
```

## License

MIT © [LogDNA](https://logdna.com/)

*Happy Logging!*
