// 2019/11/07
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import LangCh from '../../static/cn.js'
import LangEn from '../../static/en.js'

const i18n = new VueI18n({
  locale : 'cn',
  messages:{
    'cn':LangCh,
    'en':LangEn
  }
})

export default i18n;
