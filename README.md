<p align="center">
  <a href="https://app.logdna.com">
    <img height="95" width="201" src="https://raw.githubusercontent.com/logdna/artwork/master/logo%2Bnode.png">
  </a>
  <p align="center">Node.js Winston library for logging to <a href="https://app.logdna.com">LogDNA</a></p>
</p>

---

* **[Install](#install)**
* **[API](#api)**
* **[Winston Transport](#winston-transport)**
* **[License](#license)**


## Install

```sh
$ npm install --save logdna-winston
```

## API

Please see [@logdna/logger](https://www.npmjs.com/package/@logdna/logger#createloggerkey-options) for
instantiation options to passthrough to LogDNA's logger client.

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
    indexMeta: true // Defaults to false, when true ensures meta object will be searchable
}

// Only add this line in order to track exceptions
options.handleExceptions = true;

logger.add(new logdnaWinston(options));


// log with meta
logger.log({
    level: 'info'
    , message: 'Log from LogDNA-winston'
    , indexMeta: true // Optional.  If not provided, it will use the default.
    , data:'Some information' //  Properties besides level, message and indexMeta are considered as "meta"
    , error: new Error("It's a trap.") // Transport will parse the error object under property 'error'
})

// log without meta
logger.info('Info: Log from LogDNA-winston');

// A payload without 'message' will log the stringified object as the message
logger.info({
  key: 'value'
, text: 'This is some text to get logged'
, bool: true
})
```

## License

Copyright © [LogDNA](https://logdna.com), released under an MIT license.
See the [LICENSE](./LICENSE) file and https://opensource.org/licenses/MIT

*Happy Logging!*
