var Cylon = require('cylon');

Cylon.robot({
  name: 'hue-bot',
  connections: {
    hue: { adaptor: 'hue', host: '192.168.0.5', username: process.env.HUE_USER_ID || '' }
  },

  devices: {
    aladdinLamp: { driver: 'hue-light', lightId: 1},
    towerMiddle: { driver: 'hue-light', lightId: 2},
    couch: { driver: 'hue-light', lightId: 3},
    tallLamp: { driver: 'hue-light', lightId: 4},
    hallway: { driver: 'hue-light', lightId: 5},
    towerTop: { driver: 'hue-light', lightId: 6}
  },

  turnOnLivingRoom : function(){
    this.aladdinLamp.turnOn();
    this.towerMiddle.turnOn();
    this.couch.turnOn();
    this.tallLamp.turnOn();
    this.hallway.turnOn();
    this.towerTop.turnOn();

  },
  turnOffLivingRoom : function(){
    this.aladdinLamp.turnOff();
    this.towerMiddle.turnOff();
    this.couch.turnOff();
    this.tallLamp.turnOff();
    this.hallway.turnOff();
    this.towerTop.turnOff();
  },

  turnOnHallway : function(){
    this.hallway.turnOn();
  },
  turnOffHallway : function(){
    this.hallway.turnOff();
  },

  work: function(my) {
    every((1).second(), function() {
      //my.aladdinLamp.toggle();
      //my.towerMiddle.toggle();
      //my.couch.toggle();
      //my.tallLamp.toggle();
      //my.hallway.toggle();
      //my.towerTop.toggle();
    });
  }
}).start();
