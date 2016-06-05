var Cylon = require('cylon');

Cylon.robot({
  name: 'photosense-bot',
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1411' }
  },

  devices: {
    zero: { driver: 'analog-sensor', pin: 0, lowerLimit: 70, upperLimit: 95 },
    one: { driver: 'analog-sensor', pin: 1, lowerLimit: 70, upperLimit: 95 },
    two: { driver: 'analog-sensor', pin: 2, lowerLimit: 70, upperLimit: 95 }
  },

  // can probably use analog_read on the REST interface
  getValue : function(deviceNumber){
    if(deviceNumber){
      return this[deviceNumber].analogRead();
    } else
    // get average
    return ((this.zero.analogRead() + this.one.analogRead() + this.two.analogRead())/ 3);
  },
  checkLowerLimit : function(){
    var current = ((this.zero.analogRead() + this.one.analogRead() + this.two.analogRead())/ 3);
    var limit =  current <= this.zero.lowerLimit ? true : false;
    return { val : current, lowerLimit: limit}
  },
  checkUpperLimit : function(){
    var current = ((this.zero.analogRead() + this.one.analogRead() + this.two.analogRead())/ 3);
    var limit =  current >= this.zero.upperLimit ? true : false;
    return { val : current, upperLimit: limit}
  },

  work: function(my) {
    //var analogValue = 0;
    //
    every((5).second(), function() {
      analogValue = ((my.zero.analogRead() + my.one.analogRead() + my.two.analogRead())/ 3);
      console.log('Photosense average ', analogValue);
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
