'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/publish/:id', auth.hasRoles(['admin', 'blogger']), controller.publish);
//router.get('/unsubscribe/:email', controller.unsubscribe);
router.get('/subscribe/:email', controller.subscribe);
router.get('/getMailListTotal', controller.getMailListTotal);
router.get('/keywords', controller.keywords);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRoles(['admin', 'blogger']), controller.create);
router.put('/:id', auth.hasRoles(['admin', 'blogger']), controller.update);
router.delete('/:id', auth.hasRoles(['admin', 'blogger']), controller.destroy);

module.exports = router;
