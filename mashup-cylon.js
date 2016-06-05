var Cylon = require('cylon');
var request = require('request');

//bring in my other Cylons
var hue = require('./hue.js');
var photosense = require('./photosense.js');

Cylon.api("http", {
    host: '127.0.0.1',
    port: '8443',
    auth: {
      type: 'basic',
      user: 'admin',
      pass: 'pass'
    }
});

// my mcp
// curl -k -H 'Authorization: Basic YWRtaW46cGFzcw==' https://127.0.0.1:8443/api/robots/photosense-bot/devices/sensor/events/lowerLimit
var Cylon = require('cylon');

Cylon.robot({
    name: 'mashup-cylon',
    connections: {},
    devices: {},

    work: function(my) {
        var url = 'https://127.0.0.1:8443';
        var photoLower = url+'/api/robots/photosense-bot/commands/checkLowerLimit';
        var photoUpper = url+'/api/robots/photosense-bot/commands/checkUpperLimit';
        var hueOn = url+'/api/robots/hue-bot/commands/turnOnLivingRoom';
        var hueOff = url+'/api/robots/hue-bot/commands/turnOffLivingRoom';
        var options = {
            'auth': {
                'user': 'admin',
                'pass': 'pass'
            },
            'strictSSL': false,
            'json': true
        };


        every((5).second(), function() {
            request.get(photoLower, options, function(err, response, data){
                if (data.result.lowerLimit){
                    console.log('Analog lower value => ', data.result.val);
                    request.get(hueOn, options, function(err, response, data){});
                }
            });
            request.get(photoUpper, options, function(err, response, data){
                if (data.result.upperLimit){
                    console.log('Analog upper value => ', data.result.val);
                    request.get(hueOff, options, function(err, response, data){});
                }
            });
        });
    }
}).start();
