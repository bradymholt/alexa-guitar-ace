"use strict";

class Resources {
    constructor(resourceUri) {
        this.resourceUri = resourceUri; 
        this.chordsAvailable = {
            'A': ['major', '7'],
            'C': ['major', '7'],
            'D': ['major'],
            'G': ['major', '7']
        };
    }

    getTuneAudioUri() {
        return `${this.resourceUri}/tune.mp3`;
    }

    hasRoot(root) {
        var result = false;
        if (this.chordsAvailable[this.scrubRoot(root)]) {
            result = true;
        }
        return result;
    }

    // Example return object: { root: "G", type: "7", name: "G 7", audioUri: "https://foo.bar/g-7.mp3", imageUri: "https://foo.bar/g-7.png" }
    getChord(root, type) {
        root = this.scrubRoot(root);
        type = this.scrubType(type);

        let result = null;
        let chord = this.chordsAvailable[root];
        if (chord && chord.indexOf(type) > -1) {
            result = {
                name: `${root}${type}`,
                root: root,
                type: type,
                audioUri: `${this.resourceUri}/${root.toLowerCase()}-${type.toLowerCase()}.mp3`,
                imageUri: `${this.resourceUri}/${root.toLowerCase()}-${type.toLowerCase()}.png`
            };
        }

        return result;
    }

    scrubRoot(root) {
        if (root) {
            root = root.toUpperCase();
            root = root.replace('.', '');
        }

        return root;
    }

    scrubType(type) {
        if (type) {
            type = type.toLowerCase();
            type = type.replace('seven', '7');
        }

        return type;
    }
}

module.exports = Resources;