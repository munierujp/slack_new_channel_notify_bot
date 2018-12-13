var WEBHOOK_URL_GASUNIT = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL_GASUNIT')
var exports = WEBHOOK_URL_GASUNIT ? GASUnit.slack(WEBHOOK_URL_GASUNIT).exports : GASUnit.exports
var assert = GASUnit.assert

function runTests () {
  test_doPost()
  test_normalizeRequest()
  test_createTextOutput()
  test_createMessage()
  test_postToSlack()
}

function test_doPost () {
  exports({
    'doPost(e)': {
      'when request type is `url_verification`': {
        'should return challenge value of request': function () {
          var request = {
            type: REQUEST_TYPE_URL_VERIFICATION,
            challenge: 'test_challenge'
          }
          var e = {
            postData: {
              contents: JSON.stringify(request)
            }
          }
          var response = doPost(e)

          assert(response.getMimeType() === ContentService.MimeType.TEXT)
          assert(response.getContent() === request.challenge)
        }
      },
      'when request type is `event_callback` and event type is `channel_created`': {
        'should post message to Slack ': function () {
          var originalPostToSlack = postToSlack_
          var originalCreateMessage = createMessage_
          try {
            var argsList = []
            postToSlack_ = function () {
              argsList.push(arguments)
            }
            createMessage_ = function (event) {
              return {
                event: event
              }
            }

            var request = {
              type: REQUEST_TYPE_EVENT_CALLBACK,
              event: {
                type: EVENT_TYPE_CHANNEL_CREATED
              }
            }
            var e = {
              postData: {
                contents: JSON.stringify(request)
              }
            }
            doPost(e)

            assert(argsList.length === 1)
            var args = argsList[0]
            assert(args.length === 1)
            assert(args[0].event.type === request.event.type)
          } finally {
            postToSlack_ = originalPostToSlack
            createMessage_ = originalCreateMessage
          }
        }
      }
    }
  })
}

function test_normalizeRequest () {
  exports({
    'normalizeRequest_(e)': {
      'when postData has `contents` property': {
        'should return parsed request using `contents` property': function () {
          var request = {
            type: 'test_request_type'
          }
          var e = {
            postData: {
              contents: JSON.stringify(request)
            }
          }
          var normalizedRequest = normalizeRequest_(e)

          assert(normalizedRequest.type === request.type)
        }
      },
      'when postData does not have `contents` property': {
        'should return parsed request using `getDataAsString` function': function () {
          var request = {
            type: 'test_request_type'
          }
          var e = {
            postData: {
              getDataAsString: function () {
                return JSON.stringify(request)
              }
            }
          }
          var normalizedRequest = normalizeRequest_(e)

          assert(normalizedRequest.type === request.type)
        }
      }
    }
  })
}

function test_createTextOutput () {
  exports({
    'createTextOutput_(text)': {
      'should return TextOutput object': function () {
        var text = 'test_text'
        var textOutput = createTextOutput_(text)

        assert(textOutput.getMimeType() === ContentService.MimeType.TEXT)
        assert(textOutput.getContent() === text)
      }
    }
  })
}

function test_createMessage () {
  exports({
    'createMessage_(event)': {
      'should return message': function () {
        MESSAGE_TEMPLATE_DATE_FORMAT = 'YYYY[/]M[/]D H[:]mm[:]ss'
        MESSAGE_TEMPLATE = '<#{{id}}> has created by <@{{creator}}> on {{{created}}}'
        var event = {
          type: 'channel_created',
          channel: {
            id: 'C024BE91L',
            name: 'fun',
            created: 1360782804,
            creator: 'U024BE7LH'
          }
        }
        var message = createMessage_(event)

        assert(message === '<#C024BE91L> has created by <@U024BE7LH> on 2013/2/14 4:13:24')
      }
    }
  })
}

function test_postToSlack () {
  exports({
    'postToSlack_(message)': {
      'should post message to Slack': function () {
        WEBHOOK_URL = 'test_url'
        var originallUrlFetchApp = UrlFetchApp
        try {
          var argsList = []
          UrlFetchApp = {
            fetch: function () {
              argsList.push(arguments)
            }
          }

          var message = 'test_message'
          postToSlack_(message)

          assert(argsList.length === 1)
          var args = argsList[0]
          assert(args.length === 2)
          assert(args[0] === WEBHOOK_URL)
          var params = args[1]
          assert(params.method === 'POST')
          var paload = JSON.parse(params.payload)
          assert(paload.text === message)
          var headers = params.headers
          assert(headers['Content-Type'] === 'application/json')
        } finally {
          UrlFetchApp = originallUrlFetchApp
        }
      }
    }
  })
}
