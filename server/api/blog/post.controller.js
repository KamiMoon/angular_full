'use strict';

var Post = require('./post.model');
var ControllerUtil = require('../../components/controllerUtil');
var EmailUtil = require('../../components/emailUtil');

exports.getMailListTotal = function(req, res) {

    EmailUtil.getMailListTotal(function(err, total) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.json(total);
    });

};

exports.keywords = function(req, res) {

    var aggregationPipeline = [{
        '$unwind': '$keywords'
    }];

    if (req.query.search) {
        aggregationPipeline.push({
            '$match': {
                'keywords.text': {
                    '$regex': req.query.search
                }
            }
        });
    }

    aggregationPipeline.push({
        '$group': {
            '_id': '$keywords.text'
        }
    }, {
        '$sort': {
            '_id': 1
        }
    });

    Post.aggregate(aggregationPipeline).exec(function(err, keywords) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }
        return res.json(keywords);
    });
};

// Get list of events
exports.index = function(req, res) {
    ControllerUtil.find(req, res, Post, {}, {
        'createdAt': -1
    });
};

// Get a single event
exports.show = function(req, res) {
    Post.findById(req.params.id).exec(function(err, event) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        return res.json(event);
    });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
    ControllerUtil.create(req, res, Post, 'photo');
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
    ControllerUtil.update(req, res, Post);
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
    Post.findById(req.params.id, function(err, event) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        event.remove(function(err) {
            if (err) {
                return ControllerUtil.handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

exports.subscribe = function(req, res) {

    EmailUtil.subscribe(req.params.email, function(err, body) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.json('Added to mailing list');
    });

};

exports.unsubscribe = function(req, res) {

    EmailUtil.unsubscribe(req.params.email, function(err, body) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.json('Removed from mailing list');
    });

};

exports.publish = function(req, res) {

    Post.findById(req.params.id).exec(function(err, post) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }
        if (!post) {
            return res.status(404).send('Not Found');
        }

        EmailUtil.publishPost(post, function(err, body) {
            if (err) {
                return ControllerUtil.handleError(res, err);
            }

            return res.json('Published to mailing list');
        });

    });

};
