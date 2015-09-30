exports.register = function(server, options, next) {

  server.route({
    path: '/favicon.ico',
    method: 'get',
    config: {
      cache: {
        expiresIn: 1000*60*60*24*21
      }
    },
    handler: function(request, reply) {
      reply().code(200).type('image/x-icon');
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};

