'use strict';

//var should = require('should');
var Receipt = require('./receipt.model');

/*
var receipt = new Receipt({
    user_id: ''
    user_name: 'Eric',
    email: 'erickizaki@gmail.com',
    stripeCustomerId: 1,
    description: 'asdf',
    amount: 5,
    model: '',
    model_id: '',
    paymentSystem: 'Stripe',
    confirmation: '123',
    type: ''
});
*/

describe('Receipt Model', function() {
    before(function(done) {
        // Clear receipts before testing
        Receipt.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Receipt.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no receipts', function(done) {
        Receipt.find({}, function(err, receipts) {
            receipts.should.have.length(0);
            done();
        });
    });
});
