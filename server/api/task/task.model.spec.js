'use strict';

//var should = require('should');
var Task = require('./task.model');

/*
var task = new Task({
    name: 'Some Task',
    hoursWorkedOn: '5',
    estimatedHours: '5',
    status: 'Done'
});
*/

describe('Task Model', function() {
    before(function(done) {
        // Clear tasks before testing
        Task.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Task.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no tasks', function(done) {
        Task.find({}, function(err, tasks) {
            tasks.should.have.length(0);
            done();
        });
    });

});
