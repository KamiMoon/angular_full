'use strict';

var express = require('express');
var controller = require('./task.controller');
var cors = require('cors');

var router = express.Router();

router.get('/', cors(), controller.index);
router.get('/:id', cors(), controller.show);
router.post('/', cors(), controller.create);
router.put('/:id', cors(), controller.update);
router.patch('/:id', cors(), controller.update);
router.delete('/:id', cors(), controller.destroy);

module.exports = router;
