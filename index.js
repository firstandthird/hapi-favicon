var fs = require('fs');
const register = function(server, options) {
  var route = {
    path: '/favicon.ico',
    method: 'get',
    config: {
      auth: false,
      cache: {
        expiresIn: 1000*60*60*24*21
      }
    },
    handler: function(request, h) {
      if (!options.path) {
        return h.response()
        .code(204)
        .type('image/x-icon');
      }
      return h.response(fs.createReadStream(options.path))
      .code(200)
      .type('image/x-icon');
    }
  }

  if (typeof options.auth !== 'undefined') {
    route.config.auth = options.auth;
  }

  server.route(route);

};

exports.plugin = {
  register,
  once: true,
  pkg: require('./package.json')
};
