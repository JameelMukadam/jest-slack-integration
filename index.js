const readPkg = require('read-pkg')
const request = require('request')
const bugsnag = require('bugsnag')

/**
 * function to send slack your test notifications
 * @param {*} testResults this is the parameter passed through by Jest containing the test results
 */
export default function notify (testResults = {}) {
  try {
    const packageJson = readPkg.sync(process.cwd())

    bugsnag.register(packageJson.jestSlackIntegration.bugsnagAPI)

    const failedMessage = `<!here> Bad News! *${testResults.numFailedTests}* tests have failed :( Please take a look. Peace`
    const passedMessage = `<!here> Great News! All tests have passed! Your code coverage is *${testResults.coverage}* %`
    const text = testResults.numFailedTests > 0 ? failedMessage : passedMessage

    const options = {
      uri: packageJson.jestSlackIntegration.webhookUrl,
      method: 'POST',
      json: { text },
      mrkdwn: true
    }

    try {
      request(options)
    } catch (err) {
      bugsnag.notify(err)
    }
  } catch (err) {
    bugsnag.notify(err)
  }
  return testResults
}
