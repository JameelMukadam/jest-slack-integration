'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var readPkg = require('read-pkg');
var request = require('request');
var bugsnag = require('bugsnag');

/**
 * function to send slack your test notifications
 * @param {*} testResults this is the parameter passed through by Jest containing the test results
 */
module.exports = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(testResults) {
    var packageJson, failedMessage, passedMessage, text, options;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            packageJson = readPkg.sync(process.cwd());


            bugsnag.register(packageJson.jestSlackIntegration.bugsnagAPI);

            failedMessage = '<!here> Bad News! *' + testResults.numFailedTestSuites + '* test suites have failed and *' + testResults.numFailedTests + '* tests have failed :( *' + testResults.numPassedTests + '* tests have passed. Please have a look at your tests.';
            passedMessage = '<!here> Great News! All tests have passed! Code coverage is coming soon..';
            text = testResults.numFailedTestSuites > 0 || testResults.numFailedTests > 0 ? failedMessage : passedMessage;
            options = {
              uri: packageJson.jestSlackIntegration.webhookUrl,
              method: 'POST',
              json: { text: text },
              mrkdwn: true
            };
            _context.prev = 7;
            _context.next = 10;
            return request(options);

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](7);

            bugsnag.notify(_context.t0);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context['catch'](0);

            bugsnag.notify(_context.t1);

          case 20:
            return _context.abrupt('return', testResults);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 17], [7, 12]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();