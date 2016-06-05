var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    button: { driver: 'button', pin: 8 }
  },

  work: function(my) {
          // release and push wrong way around for some reason on my board
    my.button.on('push', function() {
      console.log("Button pushed!");
    });
    my.button.on('push', function() {
      console.log("Button released!");
    });
  }
}).start();
