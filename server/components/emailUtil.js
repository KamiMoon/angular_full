'use strict';

var ControllerUtil = require('./controllerUtil');
var config = require('../config/environment');

exports.createConfirmationEmail = function(req, user, callback) {
    var host = ControllerUtil.getHostFromRequest(req);

    if (host) {
        var linkAddress = 'http://' + host + '/api/users/activate/' + encodeURIComponent(user._id) + '/' + encodeURIComponent(user.activationHash);

        var body = 'Welcome, <br/>You are registered for erickizaki.com. <br/><br/>';
        body += 'To activate your account click this link: <a href="' + linkAddress + '">Activate Account</a>';

        var mailOptions = {
            from: process.env.MAILGUN_FROM, // sender address
            to: user.email, // list of receivers
            subject: 'Confirm Registration', // Subject line
            html: body // html body
        };

        config.mailgun.messages().send(mailOptions, function(err, body) {
            if (err) {
                return callback(err);
            }

            return callback(err, 'Email Sent');
        });
    }

};

exports.createReceiptEmail = function(receipt, callback) {
    var body = 'Thank you. <br><br>';
    body += 'Your purchase has been processed with erickizaki.com. Here is a receipt: <br><br>';

    body += '<table border="1">';
    body += '<tr>'
    body += '<th>Description</th>';
    body += '<th>Cost</th>';
    body += '</tr>'
    body += '<tr>'
    body += '<td>' + receipt.description + '</td>';
    body += '<td>$' + receipt.amount + '</td>';
    body += '</tr>'
    body += '</table><br>';

    body += 'Your confirmation number for this transactions is: ' + receipt._id;

    var mailOptions = {
        from: process.env.MAILGUN_FROM, // sender address
        to: receipt.email, // list of receivers
        subject: 'Receipt', // Subject line
        html: body // html body
    };

    config.mailgun.messages().send(mailOptions, function(err, body) {
        if (err) {
            return callback(err);
        }

        return callback(err, 'Email Sent');
    });

};

var createSubscriptionEmail = function(email, callback) {
    var body = '';
    body += 'Thank you for subscribing to my blog at <a href="' + process.env.DOMAIN + '/blog">erickizaki.com</a>. <br><br>';
    //body += 'To unsubscribe click <a href="%mailing_list_unsubscribe_url%">Unsubscribe</a>.';


    var mailOptions = {
        from: process.env.MAILGUN_FROM, // sender address
        to: email, // list of receivers
        subject: 'You are now following my blog', // Subject line
        html: body // html body
    };

    config.mailgun.messages().send(mailOptions, function(err, body) {
        if (err) {
            return callback(err);
        }

        return callback(err, 'Email Sent');
    });

};
exports.createSubscriptionEmail = createSubscriptionEmail;

exports.subscribe = function(email, callback) {
    var mailgun = config.mailgun;

    var members = [{
        address: email
            /*,
                    vars: {
                        mailing_list_unsubscribe_url: process.env.DOMAIN + '/api/blog/unsubscribe/' + email
                    }*/
    }];

    mailgun.lists(process.env.MAILGUN_BLOG_MAILING_LIST).members().add({
        members: members,
        subscribed: true
    }, function(err, body) {
        if (err) {
            return callback(err);
        }

        //send subscription email so they can unsubscribe
        createSubscriptionEmail(email, function(err, result) {
            if (err) {
                return callback(err);
            }

            return callback(err, 'Added to mailing list');
        });

    });
};

exports.unsubscribe = function(email, callback) {
    var mailgun = config.mailgun;

    mailgun.lists(process.env.MAILGUN_BLOG_MAILING_LIST).members(email).delete(function(err, body) {
        if (err) {
            return callback(err);
        }

        return callback(err, 'Removed from mailing list');
    });
};

exports.getMailListTotal = function(callback) {
    var mailgun = config.mailgun;

    mailgun.lists(process.env.MAILGUN_BLOG_MAILING_LIST).members().list(function(err, members) {
        if (err) {
            return callback(err);
        }

        //{ items: [], total_count: 0 }
        //console.log(members);

        return callback(err, members.total_count);
    });
};

exports.publishPost = function(post, callback) {
    var body = '';
    body += 'I have posted a new article: <a href="' + process.env.DOMAIN + '/blog/' + post._id + '">' + post.title + '</a>. <br><br>';
    //body += 'To unsubscribe click <a href="' + process.env.DOMAIN + '/' + email + '">Unsubscribe</a>.';


    var mailOptions = {
        from: process.env.MAILGUN_FROM, // sender address
        to: process.env.MAILGUN_BLOG_MAILING_LIST, // list of receivers
        subject: post.title, // Subject line
        html: body // html body
    };

    config.mailgun.messages().send(mailOptions, function(err, body) {
        if (err) {
            return callback(err);
        }

        return callback(err, 'Email Sent');
    });
}
