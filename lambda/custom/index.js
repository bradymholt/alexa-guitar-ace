'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('Welcome to Guitar Ace.');
    },
    'PlayChord': function () {
        this.emit('I cannot play chord yet.');
    },
    'Unhandled': function () {
        this.emit(':tell', "I do not understand");
    },
};
