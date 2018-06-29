const readPkg = require('read-pkg')
const request = require('request')
const bugsnag = require('bugsnag')

/**
 * function to send slack your test notifications
 * @param {*} testResults this is the parameter passed through by Jest containing the test results
 */
module.exports = async testResults => {
  try {
    const packageJson = readPkg.sync(process.cwd())

    bugsnag.register(packageJson.jestSlackIntegration.bugsnagAPI)

    const failedMessage = `<!here> Bad News! *${testResults.numFailedTestSuites}* test suites have failed and *${testResults.numFailedTests}* tests have failed :( *${testResults.numPassedTests}* tests have passed. Please have a look at your tests.`
    const passedMessage = `<!here> Great News! All tests have passed! Code coverage is coming soon..`
    const text = (testResults.numFailedTestSuites > 0 || testResults.numFailedTests > 0 ) ? failedMessage : passedMessage

    const options = {
      uri: packageJson.jestSlackIntegration.webhookUrl,
      method: 'POST',
      json: { text },
      mrkdwn: true
    }

    try {
      await request(options)
    } catch (err) {
      bugsnag.notify(err)
    }
  } catch (err) {
    bugsnag.notify(err)
  }
  return testResults
}
