var Cylon = require('cylon');

Cylon.robot({
  connections: {
    hue: { adaptor: 'hue', host: '192.168.0.5', username: process.env.HUE_USER_ID || '' }
  },

  devices: {
    bulb: { driver: 'hue-light', lightId: 2}
  },

  work: function(my) {
    every((1).second(), function() {
      my.bulb.toggle();
    });
  }
}).start();
