# msb-loggly [![Build Status](https://travis-ci.org/tcdl/msb-loggly.svg)](https://travis-ci.org/tcdl/msb-loggly)
A plugin for msb/msb-proxies to log to Loggly

## Installation

### As a library

```
$ npm install msb-loggly --save
```

You must already have `msb` installed as well, e.g.

```
$ npm install msb --save
```

### For msb-proxies CLI (http2bus and bus2http)

If you are running a global install of `msb-proxies`:

```
$ npm install msb-loggly -g
```

You must already have `msb` installed as well, e.g.

```
$ npm install msb -g
```

If you are running it as a node module, ensure `msb` is installed in the [module search paths](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders).

## Configuration

- **MSB_LOGGLY_TOKEN** Loggly input token.
- **MSB_LOGGLY_SUBDOMAIN** Subdomain for your loggly account.
- **MSB_LOGGLY_TAGS** Comma-delimited list of tags for all logging, e.g. `MSB_LOGGLY_TAGS=appgroup,production`
