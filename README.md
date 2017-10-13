skill.json expanded

index.js:

'LaunchRequest': function () {
        this.emit('Welcome to Guitar Ace.');
},
'PlayChord': function () {
        this.emit('I cannot play chords yet');
},

model:

"invocationName": "guitar ace",
...
{
 "name": "PlayChord",
 "samples": [
    "play a chord"
 ]
}

ask deploy