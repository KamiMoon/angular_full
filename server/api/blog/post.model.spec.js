'use strict';

var should = require('should');
var app = require('../../app');
var Post = require('./post.model');

var user = new Post({
    provider: 'local',
    name: 'Fake Post',
    email: 'test@test.com',
    password: 'password'
});

describe('Post Model', function() {
    before(function(done) {
        // Clear users before testing
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

    xit('should fail when saving a duplicate user', function(done) {
        user.save(function() {
            var userDup = new Post(user);
            userDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    xit('should fail when saving without an email', function(done) {
        user.email = '';
        user.save(function(err) {
            should.exist(err);
            done();
        });
    });

    xit("should authenticate user if password is valid", function() {
        return user.authenticate('password').should.be.true;
    });

    xit("should not authenticate user if password is invalid", function() {
        return user.authenticate('blah').should.not.be.true;
    });
});
