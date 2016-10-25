# Alexa Guitar Ace

An Alexa Skill that helps you tune and plays chords on your guitar

## Initial Setup

Run `npm install`, then:

### Lambda
1. Go to the [Lambda AWS Management Console](https://console.aws.amazon.com/lambda/)
2. Create Lambda function
3. Go to "Configure triggers"
4. Select "Alexa Skills Kit"
5. Go to "Configure function"
6. Use these settings:
 - Name: alexa-guitar-ace
 - Runtime: Node.js 4.3
 - Handler: index.Handler
 - Role: Choose an existing Role
 - Existing role: lambda_basic_execution
7. Proceed to review and then click "Create function"
8. Take note of the Lambda function ARN

### Alexa
1. Go to [Alexa Skills Kit Developer Console](https://developer.amazon.com/edw/home.html#/skills/list)
2. Click "Add a New Skill"
3. On Skill Information step, use these settings:
 - Name: Guitar Ace
 - Invocation Name: guitar ace
4. On Interaction Model step, use values from /speechAssets directory in this repository
5. On Configuration step, specify "AWS Lambda ARN" as Service Endpoint Type, Choose "North America" as the geographical region, and enter the Lambda ARN
6. Click "Save"

### S3
1. Go to the [S3 Amazon Management Console](https://console.aws.amazon.com/lambda/)
2. Create a new bucket named `alexa-guitar-ace`.
3. Run `npm run deploy-resources` to deploy the resources
4. Go to Properties > Permissions > Edit CORS Configuration
5. Enter this CORS config and save:
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>http://ask-ifr-download.s3.amazonaws.com</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
    </CORSRule>
</CORSConfiguration>
```


## Deploy

Run `npm run deploy-lambda`

## Usage Examples
- "Alexa, ask guitar ace to help me tune my guitar."
- "Alexa, ask guitar ace to play C7."