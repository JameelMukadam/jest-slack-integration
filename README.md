# Jest Slack Integration

This script allows you to post test results to slack.

## Setup
  - Set up a [Slack Incoming Webhook integration](https://my.slack.com/services/new/incoming-hebhook/)
  - Add the Webhook URL to `package.json` under jestSlackIntegrationWebhookUrl
```  
"jestSlackIntegrationWebhookUrl": {
  "webhookUrl": "https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXX"
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
