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
        this.emit(':ask', 'Welcome to Guitar Ace. What do you want me to do?', 'Say something like play G Major or tune my guitar.');
    },
    'PlayChord': function () {
        console.log("Request: " + JSON.stringify(this.event.request));
        console.log("Attributes: " + JSON.stringify(this.attributes));

        let slots = this.event.request.intent.slots;
        let root = slots['Root'].value || this.attributes['currentRoot'];
        let type = slots['Type'].value || this.attributes['currentType'];

        // Save current slots in session        
        this.attributes['currentRoot'] = root;
        this.attributes['currentType'] = type;

        if (!root && !type) {
            this.emit(':ask', 'Ok, what chord?', 'Just say the name of the chord.');
        } else if (root && guitarResources.hasRoot(root) && !type) {
            this.emit(':ask', `Sure, I can play the ${root} chord.  What type?`, `Say something like ${root} major or ${root} seven.`);
        } else {
            this.attributes['currentRoot'] = null;
            this.attributes['currentType'] = null;

            let chord = guitarResources.getChord(root, type);
            if (!chord) {
                this.emit(':ask', 'I do not know that chord.  Please say another chord', 'Say something like C 7.');
            } else {
                this.emit(':tellWithCard', `<audio src="${chord.audioUri}"/>`, chord.name, chord.imageUri, { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri });
            }
        }
    },
    'Tune': function () {
        this.emit(':tell', `Happy Tuning <audio src="${guitarResources.getTuneAudioUri()}" />`);
    },
    'Unhandled': function () {
        this.emit(':ask', 'I did not understand.  Please say the name of a chord to play or ask me to help you tune.');
    }
};