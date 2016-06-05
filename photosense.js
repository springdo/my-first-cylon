var Cylon = require('cylon');

Cylon.robot({
  name: 'photosense-bot',
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    photoresistor: { driver: 'analog-sensor', pin: 0, lowerLimit: 50, upperLimit: 120 }
  },

  // can probably use analog_read on the REST interface
  getValue : function(){
    //return { data : this.photoresistor.analogRead()};
    return this.photoresistor.analogRead();
  },
  checkLowerLimit : function(){
    var current = this.photoresistor.analogRead();
    var limit =  current <= this.photoresistor.lowerLimit ? true : false;
    return { val : current, lowerLimit: limit}
  },
  checkUpperLimit : function(){
    var current = this.photoresistor.analogRead();
    var limit =  current >= this.photoresistor.upperLimit ? true : false;
    return { val : current, upperLimit: limit}
  },

  work: function(my) {
    //var analogValue = 0;
    //
    every((1).second(), function() {
      analogValue = my.photoresistor.analogRead();
      console.log('Analog value => ', analogValue);
    });
    //
    //my.photoresistor.on('lowerLimit', function(val) {
    //  console.log("Lower limit reached!");
    //  //console.log('Analog value => ', val);
    //});
    //
    //my.photoresistor.on('upperLimit', function(val) {
    //  console.log("Upper limit reached!");
    //  //console.log('Analog value => ', val);
    //});
  }
}).start();
