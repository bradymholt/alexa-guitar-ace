icons added to skill.json

index.js:

let resources = new (require('./resources'))('https://s3.amazonaws.com/alexa-guitar-ace');

'PlayChord': function () {
    let root = this.attributes['chordRoot'];
    let type = this.attributes['chordType']
    if (!root) {
        this.emit(':ask', `What chord would you like to play?`);
        this.attributes['chordRoot'] = "C";
        this.attributes['chordType'] = "major";
    } else {
        let chord = resources.getChord(root, type);
        this.emit(':tellWithCard', `<audio src="${chord.audioUri}"/>`, chord.name, chord.name, { largeImageUrl: chord.imageUri, smallImageUrl: chord.imageUri });
    }
}

ask deploy