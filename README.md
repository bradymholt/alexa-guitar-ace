
en-US.json:


{
    "name": "PlayChord",
    "slots": [
    {
        "name": "Root",
        "type": "LIST_OF_ROOTS"
    },
    {
        "name": "Type",
        "type": "LIST_OF_TYPES"
    }
    ],
    "samples": [
    "play a chord",
    "play {Root}",
    "play {Root} {Type}",
    "play {Type}",
    "strum {Root}",
    "strum {Root} {Type}",
    "strum {Type}",
    "{Root} {Type}",
    "{Type}"
    ]
},

"types": [
        {
          "values": [
            {
              "name": {
                "value": "A"
              }
            },
            {
              "name": {
                "value": "B"
              }
            },
            {
              "name": {
                "value": "C"
              }
            },
            {
              "name": {
                "value": "D"
              }
            },
            {
              "name": {
                "value": "E"
              }
            },
            {
              "name": {
                "value": "F"
              }
            },
            {
              "name": {
                "value": "G"
              }
            }
          ],
          "name": "LIST_OF_ROOTS"
        },
        {
          "values": [
            {
              "name": {
                "value": "major"
              }
            },
            {
              "name": {
                "value": "minor"
              }
            },
            {
              "name": {
                "value": "seven"
              }
            }
          ],
          "name": "LIST_OF_TYPES"
        }
      ]

    index.js:


let slots = this.event.request.intent.slots;
let root = slots['Root'].value || this.attributes['currentRoot'];
let type = slots['Type'].value;

 //this.attributes['chordRoot'] = "C";
 //this.attributes['chordType'] = "major";
