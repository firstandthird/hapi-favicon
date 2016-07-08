var fs = require('fs');
exports.register = function(server, options, next) {
  var route = {
    path: '/favicon.ico',
    method: 'get',
    config: {
      cache: {
        expiresIn: 1000*60*60*24*21
      }
    },
    handler: function(request, reply) {
      if (!options.path) {
        return reply().code(204).type('image/x-icon');
      }
      reply(null, fs.createReadStream(options.path)).code(200).type('image/x-icon');
    }
  }

  if (typeof options.auth !== 'undefined') {
    route.config.auth = options.auth;
  }

  server.route(route);

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};

