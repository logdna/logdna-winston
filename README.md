<p align="center">
  <a href="https://app.logdna.com">
    <img height="95" width="201" src="https://raw.githubusercontent.com/logdna/artwork/master/logo%2Bnode.png">
  </a>
  <p align="center">Node.js Winston library for logging to <a href="https://app.logdna.com">LogDNA</a></p>
</p>

---

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

logger.add(new logdnaWinston(options))

// Log Examples

// log with meta and human readable message for Live Tail (structure upon log line expansion in-app)
let log_obj_info = {
    message: 'USER 101010 SUCCESSFUL LOGIN',
    user_id: '101010',
    trace_id: '163e169e-a326-4b1b-a8f5-7169dd4eeca8',
}
logger.log({      
    level: 'info',                         // Required.     
    message: JSON.stringify(log_obj_info), // Optional. If not provided, the stringified (read JSON) object (minus level) will be sent as the payload
                                           //           If specified, message will be the body/payload while the other parameters are then
    indexMeta: true,                       //               Optional. If not provided, it will use the default.
    geoloc: {lat:37.386,lon:-122.084}      //               Optional. Properties besides level, message and indexMeta are up to you
                                           //                         and stored in the "meta" field
})

// log errors with structure and the proper level
try {
    throw new Error("It's a trap!");
} catch(e) {
    logger.log({
        level: 'error',
        message: { // Quickly break out the important error information into searchable fields within LogDNA via JSON 
            message:e.message,
            error:{code:e.code,stack:e.stack},        
            trace_id: 'a077f0ad-ed0f-423b-b8d8-e0f9e3165d9f'
        } // no meta included this time
    })
}

// log with convenience functions
logger.info('Info: Log from LogDNA-winston')

// a payload without 'message' will log the stringified (read JSON) object as the message.  Same functionality as logger.log minus the level bit
logger.warn({
    key: 'value',
    text: 'This is some text to get logged',
    bool: true
})
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/respectus"><img src="https://avatars.githubusercontent.com/u/1046364?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Muaz Siddiqui</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=respectus" title="Code">💻</a> <a href="https://github.com/logdna/logdna-winston/commits?author=respectus" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/smusali"><img src="https://avatars.githubusercontent.com/u/34287490?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Samir Musali</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=smusali" title="Code">💻</a> <a href="https://github.com/logdna/logdna-winston/commits?author=smusali" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/darinspivey"><img src="https://avatars.githubusercontent.com/u/1874788?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Darin Spivey</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=darinspivey" title="Code">💻</a> <a href="https://github.com/logdna/logdna-winston/commits?author=darinspivey" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/LYHuang"><img src="https://avatars.githubusercontent.com/u/14082239?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Huang</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=LYHuang" title="Code">💻</a> <a href="https://github.com/logdna/logdna-winston/commits?author=LYHuang" title="Documentation">📖</a></td>
    <td align="center"><a href="http://theconnman.com/"><img src="https://avatars.githubusercontent.com/u/1328448?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brian Conn</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=TheConnMan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mariocasciaro"><img src="https://avatars.githubusercontent.com/u/105319?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mario Casciaro</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=mariocasciaro" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vilyapilya"><img src="https://avatars.githubusercontent.com/u/17367511?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vilyapilya</b></sub></a><br /><a href="#tool-vilyapilya" title="Tools">🔧</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mdeltito"><img src="https://avatars.githubusercontent.com/u/69520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Del Tito</b></sub></a><br /><a href="https://github.com/logdna/logdna-winston/commits?author=mdeltito" title="Code">💻</a> <a href="#tool-mdeltito" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

Copyright © [LogDNA](https://logdna.com), released under an MIT license.
See the [LICENSE](./LICENSE) file and https://opensource.org/licenses/MIT

*Happy Logging!*
