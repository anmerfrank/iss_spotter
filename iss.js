// REQUIRED:

const request = require('request');

// FETCH IP ADDRESS

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


// FETCH COORDINATES

const fetchCoordsByIP = function(ip, callback) {

  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;

    callback(null,  { latitude, longitude });
    
  });
};

// FLYOVER TIMES


const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;

    callback(null, passes);
    
  });
};

// CALLBACKS - NEXT ISS TIMES FOR MY LOCATION

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback (error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback (error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback (error, null);
        }
        
        callback(null, nextPasses);
    
      });
    });
  });

};


module.exports = {  nextISSTimesForMyLocation };

