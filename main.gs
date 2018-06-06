var properties = PropertiesService.getScriptProperties()
var WEBHOOK_URL = properties.getProperty('WEBHOOK_URL')

var REQUEST_TYPE_URL_VERIFICATION = 'url_verification'
var REQUEST_TYPE_EVENT_CALLBACK = 'event_callback'
var EVENT_TYPE_CHANNEL_CREATED = 'channel_created'

function doPost (e) {
  var request = normalizeRequest_(e)
  var requestType = request.type

  if (requestType === REQUEST_TYPE_URL_VERIFICATION) {
    var challenge = request.challenge
    return createTextOutput_(challenge)
  } else if (requestType === REQUEST_TYPE_EVENT_CALLBACK) {
    var event = request.event

    if (event.type === EVENT_TYPE_CHANNEL_CREATED) {
      var message = createMessage_(event)
      postToSlack_(message)
    }
  }
}

/**
* リクエストを正規化します。
* @param {Object} e - リクエスト
* @return {Object} リクエスト
*/
function normalizeRequest_ (e) {
  var postData = e.postData
  var request = postData.contents || postData.getDataAsString()
  return JSON.parse(request)
}

/**
* TextOutputオブジェクトを作成します。
* @param {string} text - テキスト
* @return {TextOutput} TextOutputオブジェクト
*/
function createTextOutput_ (text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT)
}

/**
* メッセージを作成します。
* @param {Object} event - イベント
* @param {Object} event.channel - イベントのチャンネル
* @param {string} event.channel.id - イベントのチャンネルのID
* @param {string} event.channel.creator - イベントのチャンネルの作成者
* @return {string} メッセージ
*/
function createMessage_ (event) {
  var channel = event.channel
  var id = channel.id
  var creator = channel.creator
  return '<#' + id + '> has created by <@' + creator + '>'
}

/**
* Slackにメッセージを投稿します。
* @param {string} message - メッセージ
*/
function postToSlack_ (message) {
  var params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: '{"text":"' + message + '"}'
  }
  UrlFetchApp.fetch(WEBHOOK_URL, params)
}
