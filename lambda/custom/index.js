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
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Say play a chord.');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't understand that.");
    }
};
