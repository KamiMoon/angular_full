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
    var query = ControllerUtil.getQuery(req);
    //remove page out of there
    delete query.page;
    delete query.itemsPerPage;
    delete query.totalItems;

    var projection = {};
    var sort = {
        'createdAt': -1
    };

    var paging = {
        page: req.query.page,
        itemsPerPage: req.query.itemsPerPage,
        totalItems: null
    }

    var cursor = Post.find(query, projection).sort(sort);

    if (paging.page) {
        var limit = paging.itemsPerPage || 10;
        var page = (Math.abs(paging.page) || 1) - 1;
        var skip = limit * page;

        cursor.limit(limit).skip(skip);
    }

    cursor.lean().exec(function(err, posts) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        var result = {
            posts: posts,
            paging: paging
        };

        if (paging.page) {
            //we need to get the total for the purposes of paging

            Post.count(query).lean().exec(function(err, count) {

                result.paging.totalItems = count;

                return res.status(200).json(result);
            });


        } else {
            return res.status(200).json(result);
        }

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
