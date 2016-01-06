'use strict';

var should = require('should');
var app = require('../../app');
var Post = require('./post.model');

var post = new Post({
    provider: 'local',
    title: 'Some Blog Post',
    postHtml: 'Some post html',
    headingQuote: 'Some heading'
});

describe('Post Model', function() {
    before(function(done) {
        // Clear posts before testing
        Post.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Post.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no posts', function(done) {
        Post.find({}, function(err, posts) {
            posts.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate post', function(done) {
        post.save(function() {
            var postDup = new Post(post);
            postDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should generate a slug as id', function(done) {
        post.save(function(err, post) {
            post._id.should.equal('some-blog-post');
            done();
        });
    });

    it("should have a fullUrl", function(done) {
        post.save(function(err, post) {
            post.fullUrl.should.equal(process.env.DOMAIN + '/blog/some-blog-post');
            done();
        });
    });
});
