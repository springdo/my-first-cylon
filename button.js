var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    button: { driver: 'button', pin: 3 }
  },

  work: function(my) {
          // release and push wrong way around for some reason on my board
    my.button.on('release', function() {
      console.log("Button pushed!");
    });
  }
}).start();
