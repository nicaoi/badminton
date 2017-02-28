var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('league', {
    "types" : [
      { "name" : "Men's" },
      { "name" : "Women's" },
      { "name" : "Mixed" }
    ],
		"divisions" : [
      { "name" : "1" },
      { "name" : "2" },
      { "name" : "3" },
      { "name" : "4" },
      { "name" : "5" },
      { "name" : "6" }
		],
    "sections" : [
      { "name" : "A" },
      { "name" : "B" },
      { "name" : "C" }
    ],
		"league" : {
			"type" : "Men's",
			"division" : 4
		},
		"standings" : [
			{
				"club": {
					"name": "Melbourn",
					"id": 1,
          "colour": "#A00"
				},
				"played": 4,
				"won": 2,
				"drawn": 1,
				"lost": 0,
				"points": 5
			},
			{
				"club": {
					"name": "Carrigaline",
					"id": 2,
          "colour": "#55AA55"
        },
				"played": 4,
				"won": 1,
				"drawn": 2,
				"lost": 1,
				"points": 4
			},
      {
        "club": {
          "name": "Garryduff",
          "id": 3,
          "colour": "#2555AA"
        },
        "played": 4,
        "won": 0,
        "drawn": 2,
        "lost": 2,
        "points": 2
      },
      {
        "club": {
          "name": "Nagle Tea Time",
          "id": 3,
          "colour": "#5533aa"
        },
        "played": 4,
        "won": 0,
        "drawn": 1,
        "lost": 3,
        "points": 1
      }
		]
	});
});

module.exports = router;