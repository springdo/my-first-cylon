"use strict";

var Cylon = require("cylon");

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
  name: "pibot",

  connections: {
    raspi: { adaptor: "raspi" }
  },

  devices: {
    led: { driver: "led", pin: 7 }
  },
  sayHello: function(name){
    console.log("INFO - hello cylon "+name);
  },

  turnOff: function(){
	  this.led.turnOff(function(err, val){
		  console.log("INFO - turning off "+ err || val)
	  });
  },
  turnOn: function(){
	  this.led.turnOn(function(err, val){
		  console.log("INFO - turning on "+ err || val)
	  });
  },
  work: function(my) {
    // every((1).second(), my.led.toggle);
    my.turnOn();
  }
}).start();
