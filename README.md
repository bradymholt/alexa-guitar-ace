Step 4

en-US.json

(updated already)

index.js

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
       this.emit(':tell', 'Welcome to Guitar Ace.');
   },
   'PlayChord': function () {
       let slots = this.event.request.intent.slots;
       let root = slots['Root'].value;
       let type = slots['Type'].value;

       if (!root) {
           this.emit(':ask', `What chord would you like to play?`);
       } else {
           let chord = resources.getChord(root, type);
           this.emit(':tellWithCard', `<audio src="${chord.audioUri}"/>`, chord.name, chord.name, { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri });
       }
   }
};

ask deploy
