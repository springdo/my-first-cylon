var Cylon = require('cylon');


Cylon.api("http", {
    host: '127.0.0.1',
    port: '8443',

    auth: {
          type: 'basic',
      user: 'admin',
      pass: 'pass'
    }
});


Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    sensor: { driver: 'analog-sensor', pin: 0, lowerLimit: 100, upperLimit: 900 }
  },

  work: function(my) {
    var analogValue = 0;

    every((1).second(), function() {
      analogValue = my.sensor.analogRead();
      console.log('Analog value => ', analogValue);
    });

    my.sensor.on('lowerLimit', function(val) {
      console.log("Lower limit reached!");
      console.log('Analog value => ', val);
    });

    my.sensor.on('upperLimit', function(val) {
      console.log("Upper limit reached!");
      console.log('Analog value => ', val);
    });
  }
}).start();
