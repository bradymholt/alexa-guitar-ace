# Alexa Guitar Ace

An Alexa Skill that helps you tune and plays chords on your guitar

## Deploy

## Initial / Setup
1. Create Lambda function
2. Go to "Configure triggers"
3. Select "Alexa Skills Kit"
4. Go to "Configure function"
5. Use Settings:
 - Name: alexa-guitar-ace
 - Runtime: Node.js 4.3
 - Handler: index.Handler
 - Role: Choose an existing Role
 - Existing role: lambda_basic_execution
6. Proceed to review and then click "Create function"

## Subsequent

Run `npm run deploy-lambda`