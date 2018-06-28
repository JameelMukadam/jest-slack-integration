'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = notify;
var readPkg = require('read-pkg');
var request = require('request');
var bugsnag = require('bugsnag');

/**
 * function to send slack your test notifications
 * @param {*} testResults this is the parameter passed through by Jest containing the test results
 */
function notify() {
  var testResults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  try {
    var packageJson = readPkg.sync(process.cwd());

    bugsnag.register(packageJson.jestSlackIntegration.bugsnagAPI);

    var failedMessage = '<!here> Bad News! *' + testResults.numFailedTests + '* tests have failed :( Please take a look. Peace';
    var passedMessage = '<!here> Great News! All tests have passed! Your code coverage is *' + testResults.coverage + '* %';
    var text = testResults.numFailedTests > 0 ? failedMessage : passedMessage;

    var options = {
      uri: packageJson.jestSlackIntegration.webhookUrl,
      method: 'POST',
      json: { text: text },
      mrkdwn: true
    };

    try {
      request(options);
    } catch (err) {
      bugsnag.notify(err);
    }
  } catch (err) {
    bugsnag.notify(err);
  }
  return testResults;
}