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
$ npm install --save logdna-bunyan
```

## API

Please see the [logdna](https://github.com/logdna/nodejs/) npm module for the API.

## Winston Transport

This module also provides a transport object, which can be added to winston using:

```javascript
var logdna = require('logdna-winston');
var winston = require('winston');
var options = {
    key: apikey,
    hostname: myHostname,
    ip: ipAddress,
    mac: macAddress,
    app: appName,
    env: envName
};

// Defaults to false, when true ensures meta object will be searchable
options.index_meta = true;

// Only add this line in order to track exceptions
options.handleExceptions = true;

winston.add(winston.transports.Logdna, options);
```

## License

MIT © [LogDNA](https://logdna.com/)

*Happy Logging!*
