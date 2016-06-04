var Cylon = require('cylon');
var hue = require('./hue.js');
var photosense = require('./photosense.js');

Cylon.api("http", {
    host: '127.0.0.1',
    port: '8443',
    auth: {
          type: 'basic',
      user: 'admin',
      pass: 'pass'
    }
});

