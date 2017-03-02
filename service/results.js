'use strict';

let fs = require('fs');
let readline = require('readline');
let path = require("path");

function getLeagueData(callback) {

  const filePath = path.join(__dirname, '..', 'data', 'tables.csv');
  let input = fs.createReadStream(filePath);
  let lineReader = readline.createInterface({
    input: input
  });

  let leagues =  [];
  let league = null;
  let currentTeamIndex = 0;

  lineReader.on('line', function (line) {

    const tokens = line.split(',');
    if (isLeagueName(tokens[0])) {
      if (league !== null) {
        leagues.push(league);
      }
      const leagueName = tokens[0];
      league = createLeagueFromName(leagueName);
      currentTeamIndex = 0;
    }
    else if (tokens[0] === 'Games') {
      for (let i = 1; i < tokens.length; i++) {
        if (tokens[i] === '') {
          continue;
        }
        league.teams.push({
          "name": tokens[i],
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "points": 0
        });
      }
    }
    else {
      for (let i = 1; i < tokens.length; i++) {
        if (tokens[i] === '' || tokens[i] === null) {
          continue;
        }
        const scores = tokens[i].split('-');
        // console.log(league.teams);
        // console.log(currentTeamIndex);
        // console.log(league.teams[currentTeamIndex].name);
        league.results.push({
          "scores": [
            { "team": league.teams[currentTeamIndex].name, "score": scores[0] },
            { "team": league.teams[i-1].name, "score": scores[1] }
          ]
        });

        league.teams[currentTeamIndex].played += 1;
        league.teams[i-1].played += 1;

        if (scores[0] > scores[1]) {
          league.teams[currentTeamIndex].points += 2;
          league.teams[currentTeamIndex].won += 1;
          league.teams[i-1].lost += 1;
        }
        else if (scores[0] > scores[1]) {
          league.teams[i-1].points += 2;
          league.teams[currentTeamIndex].lost += 1;
          league.teams[i-1].won += 1;
        }
        else {
          league.teams[currentTeamIndex].points += 1;
          league.teams[i-1].points += 1;
          league.teams[currentTeamIndex].drawn += 1;
          league.teams[i-1].drawn += 1;
        }
      }
      currentTeamIndex++;
    }

  });

  lineReader.on('close', () => {
    input.close();
    callback(leagues);
  });
}

function isLeagueName(str) {
  return new RegExp('^[ABCDEFGH] (Mens|Ladies|Mixed)( \\d)?').test(str);
}

function createLeagueFromName(leagueName) {
  const tokens = leagueName.split(' ');
  let league = {
    "grade": tokens[0],
    "type": tokens[1],
    "teams": [],
    "results": []
  };
  if (tokens.length > 2) {
    league["section"] = tokens[2];
  }
  return league;
}

module.exports = {
  getLeagueData
};