let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {

  require('../service/results').getLeagueData(function(data) {

    for (let league of data) {
      league.teams.sort(function(a, b){
        return (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0);
      });
    }

    let leagues = {
      "types" : [
        { "name" : "Men's" },
        { "name" : "Women's" },
        { "name" : "Mixed" }
      ],
      "divisions" : [
        { "name" : "C" },
        { "name" : "D" },
        { "name" : "E" },
        { "name" : "F" },
        { "name" : "G" },
        { "name" : "H" }
      ],
      "leagues" : data
    };

    res.render('league', leagues);
  });

});

module.exports = router;

// "standings" : [
//   {
//     "club": {
//       "name": "Melbourn",
//       "id": 1,
//       "colour": "#A00"
//     },
//     "played": 4,
//     "won": 2,
//     "drawn": 1,
//     "lost": 0,
//     "points": 5
//   },
//   {
//     "club": {
//       "name": "Carrigaline",
//       "id": 2,
//       "colour": "#55AA55"
//     },
//     "played": 4,
//     "won": 1,
//     "drawn": 2,
//     "lost": 1,
//     "points": 4
//   },
//   {
//     "club": {
//       "name": "Garryduff",
//       "id": 3,
//       "colour": "#2555AA"
//     },
//     "played": 4,
//     "won": 0,
//     "drawn": 2,
//     "lost": 2,
//     "points": 2
//   },
//   {
//     "club": {
//       "name": "Nagle Tea Time",
//       "id": 3,
//       "colour": "#5533aa"
//     },
//     "played": 4,
//     "won": 0,
//     "drawn": 1,
//     "lost": 3,
//     "points": 1
//   }
// ]