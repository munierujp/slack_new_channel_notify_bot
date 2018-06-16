(function () {
  var LANG_JA = 'ja'
  if (MESSAGE_TEMPLATE_DATE_LANG === LANG_JA) {
    moment.lang(LANG_JA, {
      weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
      weekdaysMin: ['日', '月', '火', '水', '木', '金', '土']
    })
  }
})()
