/**
 * Implement these functions following the node style callback pattern
 */

const fs = require('fs');
const request = require('needle');

const pluckFirstLineFromFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.split('\n')[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
const getStatusCode = (url, callback) => {
  request.get(url, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.statusCode);
    }
  });
};

module.exports = {
  getStatusCode,
  pluckFirstLineFromFile
};
