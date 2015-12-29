'use strict';

var path = require('path');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var request = require('request');
var Mailgun = require('mailgun-js');

var mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});


function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// create reusable transporter object using SMTP transport
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});

var RECAPTCHA = process.env.RECAPTCHA;

function verifyRecaptcha(req, callback) {

    var remoteip = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
    var response = req.body['g-recaptcha-response'];
    var hostName = 'https://www.google.com/recaptcha/api/siteverify';

    request.post(
        hostName, {
            form: {
                secret: RECAPTCHA,
                remoteip: remoteip,
                response: response
            }
        },
        function(error, response, body) {
            if (error) {
                callback(error);
            }

            if (response.statusCode === 200 && body.success) {
                callback(false, 'success');
            } else {
                callback(body['error-codes']);
            }
        }
    );

}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'angular-full-secret'
    },

    // List of user roles
    //userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
        clientID: process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },

    transporter: transporter,
    verifyRecaptcha: verifyRecaptcha,

    mailgun: mailgun

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
