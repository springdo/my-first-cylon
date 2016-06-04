var Cylon = require('cylon');

Cylon.robot({
  name: 'photosense-bot',
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    sensor: { driver: 'analog-sensor', pin: 0, lowerLimit: 50, upperLimit: 70 }
  },

  work: function(my) {
    var analogValue = 0;

    every((1).second(), function() {
      analogValue = my.sensor.analogRead();
      console.log('Analog value => ', analogValue);
    });
    //
    my.sensor.on('lowerLimit', function(val) {
      console.log("Lower limit reached!");
      //console.log('Analog value => ', val);
    });

    my.sensor.on('upperLimit', function(val) {
      console.log("Upper limit reached!");
      //console.log('Analog value => ', val);
    });
  }
}).start();
