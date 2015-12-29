'use strict';

var express = require('express');
var ControllerUtil = require('../../components/controllerUtil');
var EmailUtil = require('../../components/emailUtil');


var router = express.Router();

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
router.get('/submit/:mail', function(req, res) {

    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    var data = {
        //Specify email data
        from: process.env.MAILGUN_FROM,
        //The email to contact
        to: req.params.mail,
        //Subject and text data  
        subject: 'Hello from Mailgun',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function(err, body) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.json('submitted');
    });

});

router.get('/subscribe/:mail', function(req, res) {

    EmailUtil.subscribe(req.params.mail, function(err, body) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.json('Added to mailing list');
    });

});

router.get('/unsubscribe/:mail', function(req, res) {

    EmailUtil.unsubscribe(req.params.mail, function(err, body) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.json('Removed from mailing list');
    });

});

module.exports = router;
