var express = require('express');
var router = express.Router();
var auth = require('../auth');

var insultCtrl = require('../controllers/insult.server.controller.js');
var personCtrl = require('../controllers/person.server.controller.js');

/* GET home page. */
router.get('/', 
	auth.ensureAuthenticated,
	function(req, res) {
  	res.render('insults', { title: 'Academic Demotivator', user: req.user });
});

router.get('/api/insult', function(req,res) {
	return insultCtrl.getInsult(req,res);
});

router.get('/api/insults', function(req,res) {
	return insultCtrl.getInsults(req,res);
});

router.get('/api/insult/:person', function(req,res) {
	return insultCtrl.getInsultForPerson(req,res);
});

router.post('/api/insult', function(req,res) {
	return insultCtrl.createInsult(req,res);
});

router.get('/api/persons', function(req,res) {
	return personCtrl.getPersons(req,res);
});

router.post('/api/person', function(req,res) {
	return personCtrl.createPerson(req,res);
});





module.exports = router;
