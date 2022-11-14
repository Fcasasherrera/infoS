import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

const en = require('./en.json');
const es = require('./es.json');

const locales = RNLocalize.getLocales();
export const localLang = locales[0].languageCode !== 'es' ? 'en' : 'es';
i18n.translations = {
  en,
  es,
};
i18n.locale = localLang;

export const str = (name: string, vars: object | undefined = {}) => {
  return i18n.t(name, {...vars});
};
