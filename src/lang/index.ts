import Vue from 'vue';
import VueI18n from 'vue-i18n';

//tslint:disable-next-line:no-var-requires
const zh = require ('./zh-CN.json');
//tslint:disable-next-line:no-var-requires
const en = require ('./en-US.json');
//tslint:disable-next-line:no-var-requires
const es = require ('./es-EC.json');
 //const elementEnLocale = require ('element-ui/lib/locale/lang/en'); // element-ui lang
// const elementZhLocale = require ('element-ui/lib/locale/lang/zh-CN'); // element-ui lang
// const elementEsLocale = require ('element-ui/lib/locale/lang/es'); // element-ui lang

//import Cookies from 'js-cookie';

//const ElementLocale = require('element-ui/lib/locale');

 Vue.use(VueI18n);

// const messages = {
//   en: {
//     ...en,
//     // ...elementEnLocale
//   },
//   zh: {
//     ...zh,
//     // ...elementZhLocale
//   },
//   es: {
//     ...es,
//     // ...elementEsLocale
//   }
// };

// const i18n: any = new VueI18n({
//   locale: Cookies.get('language') || 'zh',
//   messages
// });
const i18n: any = new VueI18n()
// 解决Element-ui组件内的词条
 //ElementLocale.i18n((key: any, value: any) => i18n.vm._t(key, value));
export default i18n;
