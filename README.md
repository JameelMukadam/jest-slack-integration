# Jest Slack Integration

This script allows you to post test results to slack.

## Setup
  - Set up a [Slack Incoming Webhook integration](https://my.slack.com/services/new/incoming-hebhook/)
  - Add the Webhook URL to `package.json` under `jestSlackIntegration`
  - Add the App Name to `package.json` under `jestSlackIntegration`
  - (optional) Add your bugsnag API key to `package.sjon` under `jestSlackIntegration`
```  
"jestSlackIntegration": {
  "webhookUrl": "https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXX",
  "bugsnagAPI": "bgfdsy564e3y6b7nuh54dd",
  "appName": "My App"
},
```
Set `jest-slack-integration` as the jest testResultsProcessor
```
"jest": {
  "testResultsProcessor": "./node_modules/jest-slack-integration"
},
```


## Support

  - Log an issue on this repo
