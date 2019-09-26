

const request = require('request');

 
const fetchMyIP = function(callback) { 

  request((`https://api.ipify.org?format=json`), (error, response, body) => {
    const data = JSON.parse(body);
  
    if (typeof data.ip === 'undefined') {
      callback(error, null);
  
    } else
  
      callback(data, error);
  });
  
}

module.exports = { fetchMyIP };

