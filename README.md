# Alexa Guitar Ace

An Alexa Skill that helps you tune and plays chords on your guitar

## Development Setup

1. Install [Node.js >= 6.10](https://nodejs.org/en/download/)
2. Chage directory to root of skill handler: `cd lambda`
3. `npm install`

## Deploy

1. Install [Node.js >= 6.10](https://nodejs.org/en/download/)
2. Install [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
3. Install Alexa Skills Kit Command Line Interface (ASK CLI) with `npm install -g ask-cli`
4. Make sure you have a [Named Profile](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) defined for the AWS CLI.
5. Run `ask init`, select your AWS profile and then grant access to your Amazon account.
6. Run `./deploy.sh`

## Usage Examples

- "Alexa, ask guitar ace to help me tune my guitar."
- "Alexa, ask guitar ace to play C7."
