"use strict";

var Alexa = require('alexa-sdk');
var Resources = require('./resources');
var guitarResources = new Resources('https://s3.amazonaws.com/alexa-guitar-ace');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Guitar Ace. What do you want me to do?', 'Say something like play G Major or help me tune my guitar.');
    },
    'Tune': function () {
        this.emit(':tell', `Happy Tuning <audio src="${guitarResources.getTuneAudioUri()}" />`);
    },
    'PlayChord': function () {
        //console.log("Request: " + JSON.stringify(this.event.request));
        //console.log("Attributes: " + JSON.stringify(this.attributes));

        let slots = this.event.request.intent.slots;
        let root = slots['Root'].value || this.attributes['currentRoot'];
        let type = slots['Type'].value; 

        if (!root && !type) {
            this.emit(':ask', 'Ok, what chord should I play?', 'Just say the name of the chord.');
        } else if (root && guitarResources.hasRoot(root) && !type) {
            // User said root chord but not the type so ask them for the type

            // Save current root in session so we will have access to it next time
            this.attributes['currentRoot'] = root;

            this.emit(':ask', `Sure, I can play the ${root} chord.  What type?`, `Say something like ${root} major or ${root} seven.`);
        } else {
            this.attributes['currentRoot'] = null;

            let chord = guitarResources.getChord(root, type);
            if (!chord) {
                this.emit(':ask', 'I do not know that chord.  Please say another chord', 'Say something like C 7.');
            } else {
                this.emit(':tellWithCard', `<audio src="${chord.audioUri}"/>`, chord.name, chord.name, { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri });
            }
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Say something like play G Major or tune my guitar.');
    }
};