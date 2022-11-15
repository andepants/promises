/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

const fs = require('fs');
const request = require('needle');
const Promise = require('bluebird');

const pluckFirstLineFromFileAsync = (filePath) => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data.split('\n')[0]);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
const getStatusCodeAsync = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync,
  pluckFirstLineFromFileAsync
};
