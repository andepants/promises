/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var {pluckFirstLineFromFileAsync} = require('./promiseConstructor.js');
var {getGitHubProfileAsync} = require('./promisification.js');

const fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .catch((err) => {
      console.log('Invalid Line!');
    })
    .then((user) => {
      return getGitHubProfileAsync(user);
    })
    .catch((err) => {
      console.log('Request timeout to API!');
    })
    .then((body) => {
      fs.writeFileSync(writeFilePath, JSON.stringify(body));
    })
    .catch((err) => {
      console.log('something went wrong');
    });
};

module.exports = {
  fetchProfileAndWriteToFile
};
