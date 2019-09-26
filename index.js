// index.js
const request = ('request');
const { fetchMyIP } = require('./iss');

fetchMyIP((ip, error) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});