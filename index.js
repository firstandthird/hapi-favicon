var fs = require('fs');

const defaults = {
  appleTouch: true
};

const register = function(server, options) {
  options = Object.assign({}, defaults, options);
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
  if (options.appleTouch) {
    server.route({
      method: '*',
      path: '/apple-touch-icon{size?}.png',
      handler: (request, h) => {
        // if appleTouch is just true then return No Content
        if (options.appleTouch === true) {
          return h.response()
          .code(204)
          .type('image/x-icon');
        }
        // if appleTouch is a string it is a path to the icons:
        const sizesAvail = ['57x57', '60x60', '72x72', '76x76', '114x114', '120x120', '144x144', '152x152'];
        let size = request.params.size;

        if (size.substring(0, 1) === '-') {
          size = size.substring(1);
        }

        if (!sizesAvail.includes(size)) {
          size = sizesAvail.pop();
        }
        return h.file(`${options.appleTouch}/apple-touch-icon-${size}.png`);
      }
    });
  }
};

exports.plugin = {
  register,
  once: true,
  pkg: require('./package.json')
};
