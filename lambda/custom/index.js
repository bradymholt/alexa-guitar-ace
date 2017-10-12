'use strict';
var Alexa = require("alexa-sdk");
var resources = new (require('./resources'))('https://s3.amazonaws.com/alexa-guitar-ace');

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
        let chord = resources.getChord("C", "major");
        this.emit(':tellWithCard', `<audio src="${chord.audioUri}"/>`, chord.name, chord.name, { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri });
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Say play a chord.');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't understand that.");
    }
};
