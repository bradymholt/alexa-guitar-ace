"use strict";

var Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

let states = {
    TUNE_MODE: '_TUNE_MODE', // User is wanting to play chord.
    CHORD_MODE: '_CHORD_MODE'  // User is tuning.
};

let resourceUri = 'https://s3.amazonaws.com/alexa-guitar-ace';
let chordsAvailable = {
    'a': ['major', '7'],
    'c': ['major', '7'],
    'd': ['major'],
    'g': ['major', '7']
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Guitar Ace.  I can play chords and help you tune your guitar.  What would you like me to do?', 'Say something like play G Major or tune my guitar.');
    },
    'PlayChord': function () {
        let root = this.event.request.intent.slots['Root'].value || this.attributes['currentRoot'];
        let type = this.event.request.intent.slots['Type'].value || this.attributes['currentType'];

        // Save current slots in session        
        this.attributes['currentRoot'] = root;
        this.attributes['currentType'] = type;

        if (root) {
            root = root.toLowerCase();
            root = root.replace('.', '');
        }

        if (type) {
            type = type.toLowerCase();
            type = type.replace('seven', '7');
        }

        if (!root && !type) {
            this.emit(':ask', 'What chord?', 'Just say the name of the chord.');
        } else if (root && chordsAvailable[root] && !type) {
            this.emit(':ask', `Sure, I can play the ${root} chord.  What type?`, `Say something like ${root} major or ${root} seven.`);
        } else {
            if (!chordsAvailable[root] || chordsAvailable[root].indexOf(type) == -1) {
                this.emit(':ask', 'I do not know that chord.  Please say another chord', 'Say something like C 7.');
            } else {
                this.emit(':tellWithCard', `<audio src="${resourceUri}/${root}-${type}.mp3" />`, `${root}${type}`, 'Test 123', { largeImageUrl: `${resourceUri}/${root}-${type}.png` });
            }

            this.attributes['currentRoot'] = null;
            this.attributes['currentType'] = null;
        }
    },
    'Tune': function () {
        this.emit(':tell', `Happy Tuning <audio src="${resourceUri}/tune.mp3" />`);
    },
    'Unhandled': function () {
        this.emit(':ask', 'I did not understand.  Please say the name of a chord to play or ask me to help you tune.');
    }
};