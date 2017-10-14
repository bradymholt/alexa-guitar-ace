'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'Welcome to Guitar Ace.');
    },
    'PlayChord': function () {
        this.emit(':tell', 'I cannot play a chord yet.');
    }
};
