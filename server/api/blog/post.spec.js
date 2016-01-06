'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

//TODO create test data

var post = {
    title: 'Some Blog Post',
    postHtml: 'Some post html',
    headingQuote: 'Some heading'
};

describe('GET /api/blog/list', function() {

    it('should return a list of blog posts', function(done) {
        request(app)
            .get('/api/blog/list')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

    it('should return a list of keywords', function(done) {
        request(app)
            .get('/api/blog/keywords')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

    it('should return a paging object', function(done) {
        request(app)
            .get('/api/blog/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);

                res.body.should.have.property('posts');
                res.body.posts.should.be.instanceof(Array);

                res.body.should.have.property('paging');
                res.body.paging.should.have.property('totalItems');

                done();
            });
    });

    it('should return a mailing list total', function(done) {
        request(app)
            .get('/api/blog/getMailListTotal')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);

                res.body.should.be.instanceof(Number);

                done();
            });
    });

    it('should get a post by id', function(done) {
        request(app)
            .get('/api/blog/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);

                res.body.should.be.instanceof(Object);

                done();
            });
    });

    //hits external api
    xit('should subscribe by email', function(done) {
        request(app)
            .get('/api/blog/subscribe/erickizaki@gmail.com')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);

                console.log(res.body.should.be('Added to mailing list'));

                done();
            });
    });

    //TODO getting 401 unathorized
    it('should add a post', function(done) {
        request(app)
            .post('/api/blog')
            .send(post)
            .expect(201)
            //.expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);

                //res.body.should.be.instanceof(Object);
                console.log(res.body);

                done();
            });
    });


});
