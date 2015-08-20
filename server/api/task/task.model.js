'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: 'String',
    hoursWorkedOn: Number,
    estimatedHours: Number,
    status: 'String'
});

module.exports = mongoose.model('Task', TaskSchema);