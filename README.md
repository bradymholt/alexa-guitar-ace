index.js:

var resources = new (require('./resources'))('https://s3.amazonaws.com/alexa-guitar-ace');

    'PlayChord': function () {
let chord = resources.getChord("C", "major");
this.emit(':tellWithCard', `<audio src="${chord.audioUri}"/>`, chord.name, chord.name, { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri });
    }

ask deploy