[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# slack_new_channel_notify_bot
Slackの新規チャンネルを通知するBOT

## プロパティ
|プロパティ|説明|例|
|---|---|---|
|`MESSAGE_TEMPLATE`|メッセージのテンプレート|`<#{{id}}> has created by <@{{creator}}> on {{created}}.`|
|`MESSAGE_TEMPLATE_CREATED_FORMAT`|メッセージのテンプレートの`created`のフォーマット|`YYYY[/]M[/]D H[:]mm[:]ss`|
|`MESSAGE_TEMPLATE_DATE_LANG`|メッセージのテンプレートの日付の言語|`ja`|
|`WEBHOOK_URL`|SlackのWebhook URL|`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`|

### MESSAGE_TEMPLATE
以下の変数を用いて、[Mustache.js](https://github.com/janl/mustache.js/)の記法で書けます。

|変数|説明|例|
|---|---|---|
|`id`|チャンネルID|`C024BE91L`|
|`name`|チャンネル名|`fun`|
|`created`|作成日持|`2013-02-13T19:13:24.000Z`|
|`creator`|作成者のユーザーID|`U024BE7LH`|

### MESSAGE_TEMPLATE_CREATED_FORMAT
[Moment.js](https://momentjs.com/docs/#/displaying/format/)のフォーマットパターンを使用できます。

### MESSAGE_TEMPLATE_DATE_LANG
以下の言語を指定できます。  
指定しなかった場合や、これ以外の値を指定した場合は英語になります。

|値|説明|
|---|---|
|`ja`|日本語|

## ライブラリ
* Moment  
`MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48`
* Mustache  
`MoB1GsrPeNTPPX8SRqpw8QDVZgzu5bsVr`
