/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

const fs = require('fs');
const request = require('needle');
const crypto = require('crypto');
const Promise = require('bluebird');

const getGitHubProfile = (user, callback) => {
  const url = 'https://api.github.com/users/' + user;
  const options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

const getGitHubProfileAsync = Promise.promisify(getGitHubProfile);

const generateRandomToken = (callback) => {
  crypto.randomBytes(20, (err, buffer) => {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

const generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO

const readFileAndMakeItFunny = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) { return callback(err); }

    const funnyFile = file.split('\n')
      .map((line) => {
        return line + ' lol';
      })
      .join('\n');

    callback(null, funnyFile);
  });
};

const readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny);

module.exports = {
  getGitHubProfileAsync,
  generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync
};
