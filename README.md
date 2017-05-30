# auto-tunnel [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Simple HTTP(S) proxy tunnelling agents.


## Installation

[Node.js](http://nodejs.org/) `>= 4` is required. To install, type this at the command line:
```shell
npm install auto-tunnel
```


## Usage

```js
const http = require('http');
const tunnel = require('auto-tunnel');

http.get({
    agent: tunnel('http://hostname/'),
    host: 'hostname',
    path: '/'
}, function(response) {
    
});
```

You can override the internal environmental variable (`HTTP_PROXY`, etc) check with `proxyUrl`:

```js
tunnel('http://hostname/', {
    proxyUrl: 'http://proxy/'
})
```

You can supply headers to the proxy with `proxyHeaders`:

```js
tunnel('http://hostname/', {
    proxyHeaders: {
        'user-agent': 'my app'
    }
})
```


[npm-image]: https://img.shields.io/npm/v/auto-tunnel.svg
[npm-url]: https://npmjs.org/package/auto-tunnel
[travis-image]: https://img.shields.io/travis/stevenvachon/auto-tunnel.svg
[travis-url]: https://travis-ci.org/stevenvachon/auto-tunnel
