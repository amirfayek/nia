/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
<<<<<<< HEAD

  app.use('/chat/:id', require('./api/chat'));
=======
  app.use('/api/toprentals', require('./api/toprental'));
>>>>>>> ba31cd196eb050d90935ebf93f8085fdcf327fd1
  app.use('/api/movies', require('./api/movie'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
