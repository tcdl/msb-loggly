var os = require('os');

exports.exception = function(err) {
  return {
    level: 'critical',
    timestamp: new Date(),
    error: {
      message: err.message || undefined,
      code: err.code || undefined,
      stack: err.stack && err.stack.split('\n'),
    },
    process: {
      pid: process.pid,
      uid: process.getuid ? process.getuid() : null,
      gid: process.getgid ? process.getgid() : null,
      cwd: process.cwd(),
      execPath: process.execPath,
      version: process.version,
      argv: process.argv,
      memoryUsage: process.memoryUsage()
    },
    os: {
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      loadavg: os.loadavg(),
      uptime: os.uptime()
    }
  };
};

exports.http = function(startedAt, req, res) {
  var resHeaders = res._headers || {};

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip) {
    ip = ip.split();
  }

  return {
    level: (res.statusCode < 500) ? 'info' : 'error',
    timestamp: startedAt,
    req: {
      method: req.method,
      url: req.originalUrl,
      ip: ip,
      useragent: req.headers['user-agent'],
      referer: req.headers['referer'],
      contentLength: req.headers['content-length'],
      contentType: req.headers['content-type']
    },
    res: {
      status: res.statusCode,
      location: resHeaders.location,
      contentLength: resHeaders['content-length'],
      contentType: resHeaders['content-type'],
      correlationId: resHeaders['x-msb-correlation-id']
    },
    ms: Date.now() - startedAt
  };
};
