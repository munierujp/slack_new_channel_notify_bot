var properties = PropertiesService.getScriptProperties()
var MESSAGE_TEMPLATE = properties.getProperty('MESSAGE_TEMPLATE')
var MESSAGE_TEMPLATE_CREATED_FORMAT = properties.getProperty('MESSAGE_TEMPLATE_CREATED_FORMAT')
var MESSAGE_TEMPLATE_DATE_LANG = properties.getProperty('MESSAGE_TEMPLATE_DATE_LANG')
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
* @param {string} event.channel.name - イベントのチャンネルの名前
* @param {number} event.channel.created - イベントのチャンネルの作成日持
* @param {string} event.channel.creator - イベントのチャンネルの作成者
* @return {string} メッセージ
*/
function createMessage_ (event) {
  var channel = event.channel
  var replacers = [
    [/{{id}}/g, channel.id],
    [/{{name}}/g, channel.name],
    [/{{created}}/g, Moment.moment(channel.created * 1000).format(MESSAGE_TEMPLATE_CREATED_FORMAT)],
    [/{{creator}}/g, channel.creator]
  ]
  return replaceText_(MESSAGE_TEMPLATE, replacers)
}

/**
* 文字列を複数の条件で置換します。
* @param {string} source 文字列
* @param {Object[][]} replacers 置換用オブジェクト配列
* @return {string} 置換した文字列
*/
function replaceText_ (source, replacers) {
  var replaced = source
  for (var i in replacers) {
    var replacer = replacers[i]
    replaced = replaced.replace(replacer[0], replacer[1])
  }
  return replaced
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
