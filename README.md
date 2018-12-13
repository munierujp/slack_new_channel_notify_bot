[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# slack_new_channel_notify_bot
Slackの新規チャンネルを通知するBOT

## プロパティ
|プロパティ|説明|例|
|---|---|---|
|`MESSAGE_TEMPLATE`|メッセージのテンプレート|`<#{{id}}> has created by <@{{creator}}> on {{created}}.`|
|`MESSAGE_TEMPLATE_DATE_FORMAT`|メッセージのテンプレートの日付のフォーマット|`YYYY[/]M[/]D H[:]mm[:]ss`|
|`MESSAGE_TEMPLATE_DATE_LANG`|メッセージのテンプレートの日付の言語|`ja`|
|`WEBHOOK_URL`|SlackのWebhook URL（メッセージ投稿用）|`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`|
|`WEBHOOK_URL_GASUNIT`|SlackのWebhook URL（GASUnitによるテスト結果投稿用）|`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`|

### MESSAGE_TEMPLATE
[MESSAGE_TEMPLATE.md](MESSAGE_TEMPLATE.md)を参照してください。

### MESSAGE_TEMPLATE_DATE_FORMAT
[Moment.js](https://momentjs.com/docs/#/displaying/format/)のフォーマットパターンを使用できます。

### MESSAGE_TEMPLATE_DATE_LANG
以下の言語を指定できます。  
指定しなかった場合や、これ以外の値を指定した場合は英語になります。

|値|説明|
|---|---|
|`ja`|日本語|

## ライブラリ
以下のライブラリを使用しています。

|ライブラリ|プロジェクトキー|
|---|---|
|GASUnit|`MSnMmw8hLWgjUG6uKSTQBEzVZgzu5bsVr`|
|Moment|`MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48`|
|Mustache|`13re0EpD6XiVa5zHXndGiYtcH-QMnbeE5MJH190pJ8xCYhmuW5sX2ZO5R`|
