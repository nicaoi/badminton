var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('club', {
		"clubs": [{
			"name": "Melbourn",
			"id": 1
		},{
			"name": "Carrigaline",
			"id": 2
		}]
	});
});

module.exports = router;