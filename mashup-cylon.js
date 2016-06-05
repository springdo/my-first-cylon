var Cylon = require('cylon');
var request = require('request');

var options = {
    'baseUrl': 'https://127.0.0.1:8443',
    'auth': {
        'user': 'admin',
        'pass': 'pass'
    },
    'strictSSL': false,
    'json': true
};
var baseReq = request.defaults(options);


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



Cylon.robot({
    name: 'mashup-cylon',
    connections: {},
    devices: {},

    work: function(my) {
        var photoLower = '/api/robots/photosense-bot/commands/checkLowerLimit';
        var photoUpper = '/api/robots/photosense-bot/commands/checkUpperLimit';
        var hueOn = '/api/robots/hue-bot/commands/turnOnLivingRoom';
        var hueOff = '/api/robots/hue-bot/commands/turnOffLivingRoom';

        after((5).seconds(), function() {
            return console.log("INFO - MCP Reporting for DUTY");
        });

        // TODO - change to mqtt or something like that
        every((7).second(), function() {
            baseReq.get(photoUpper, options, function(err, response, data){
                if (data.result.upperLimit){
                    console.log('MCP - Analog lower value => ', data.result.val);
                    // TODO - bring lights up gradually based on how dark it is....
                    var req = {
                        url : hueOn,
                        body : data.result,
                        method : 'post'
                    };
                    baseReq(req, function(err, response, data){
                        if (err) console.log(err)
                    });
                }
            });
             //TODO - think of better way to turn lights off
            request.get(photoLower, options, function(err, response, data){
                if (data.result.lowerLimit){
                    console.log('MCP - Analog upper value => ', data.result.val);
                    request.get(hueOff, options, function(err, response, data){});
                }
            });
        });
    }
}).start();
