'use strict';

let express = require('express');
let path = require("path");
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('results', {});
});

var match = {
  'winner_id': 1,
  'class': 'XD',
  'competitors': [
    {
      'name' : "Sutton / Rowntree",
      'id' : 1,
      'players' : [
        { 'id' : 1, 'name' : 'Kevin Sutton' },
        { 'id' : 2, 'name' : 'Nicola Rowntree' }
      ]
    },
    {
      'name' : "Smith / Jones",
      'id' : 2,
      'players' : [
        { 'id' : 1, 'name' : 'Bob Smith' },
        { 'id' : 2, 'name' : 'John Jones' }
      ]
    }
  ],
  'scores': [
    { 'competitor_id': 1, 'score': 2 },
    { 'competitor_id': 2, 'score': 1 }
  ],
  'games': [
    {
      'scores': [
        { 'competitor_id': 1, 'score': 21 },
        { 'competitor_id': 2, 'score': 18 }
      ]
    },
    {
      'scores': [
        { 'competitor_id': 1, 'score': 16 },
        { 'competitor_id': 2, 'score': 21 }
      ]
    },
    {
      'scores': [
        { 'competitor_id': 1, 'score': 24 },
        { 'competitor_id': 2, 'score': 22 }
      ]
    }
  ]
};

let matches = [match, match, match, match];

router.get('/test', function(req, res, next) {

  require('../service/results').getLeagueData(function(data) {
    res.send(data);
  });

});


router.get('/:id', function(req, res, next) {
  res.render('result', {
    'date': '2017-02-01T20:00:00Z',
    'location': {
      'id': 1,
      'name': 'Bishopstown GAA'
    },
    'competition': {
      'id': 1,
      'type': 'league',
      'division': 'F',
      'class': 'mixed',
      'season': '2016/2017'
    },
    'competitors': [
      {
        'name' : "Melbourn",
        'id' : 1,
        'crest' : 'melbourn.png'
      },
      {
        'name' : "Carrigaline",
        'id' : 2,
        'crest' : 'carrigaline.jpg'
      }
    ],
    'scores': [
      { 'competitor_id': 1, 'score': 3 },
      { 'competitor_id': 2, 'score': 1 }
    ],
    'matches': matches
  });
});


module.exports = router;