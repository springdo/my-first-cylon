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

  turnOn: function(my){
	  my.led.turnOn(function(err, val){
		  console.log(err || val)
	  });
  },
  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();
