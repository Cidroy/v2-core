import Vue from "vue"
import VueI18n from "vue-i18n"
import axios from "axios"
import * as util from "@@/config/util"

Vue.use(VueI18n)

const loadedLanguages = util.i18n.preload // our default language that is preloaded
const messages: VueI18n.LocaleMessages = {}

function setI18nLanguage(lang: util.ILanguage): util.ILanguage {
	vI18n.locale = lang
	axios.defaults.headers.common["Accept-Language"] = lang
	let HtmlTag = document.querySelector("html")
	if (HtmlTag) HtmlTag.setAttribute("lang", lang)
	return lang
}

const vI18n = new VueI18n({
	locale: util.i18n.current, // set locale
	fallbackLocale: util.i18n.default,
	messages // set locale messages
})
type ILanguage = util.ILanguage
export class i18n extends util.i18n{
	public static async loadLanguageAsync(lang: util.ILanguage): Promise<util.ILanguage> {
		if (!loadedLanguages.includes(lang)) {
			const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/i18n/lang/${lang}`)
			vI18n.setLocaleMessage(lang, msgs.default || msgs)
			loadedLanguages.push(lang)
			return setI18nLanguage(lang)
		}
		return setI18nLanguage(lang)
	}
}

i18n.loadLanguageAsync(i18n.default)

export {
	vI18n,
	ILanguage
}