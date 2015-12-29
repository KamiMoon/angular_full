/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/mail', require('./api/mail'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/contacts', require('./api/contact'));
    app.use('/api/blog', require('./api/blog'));
    app.use('/api/things', require('./api/thing'));
    app.use('/api/tasks', require('./api/task'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets|css3presentation)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};
