import { ITranslations } from "@/i18n/ITranslations"
import { Stage } from "@/classes/install-router"

const Hindi: ITranslations = {
	install: {
		helpdoc: {
			[Stage.NONE]: `none(Hi)`,
			[Stage.LANGUAGE]: `language(Hi)`,
			[Stage.PRODUCT_KEY]: `productKey(Hi)`,
			[Stage.MODE_SELECT]: `modeSelect(Hi)`,
			[Stage.SLAVE_MODE]: `slaveMode(Hi)`,
			[Stage.HARDWARE_SELECT]: `hardwareSelect(Hi)`,
			[Stage.HARDWARE_CONFIRM]: `hardwareConfirm(Hi)`,
			[Stage.DONE]: `done(Hi)`,
		},
		steps: {
			select_language: `select_language(Hi)`,
			product_key: `product_key(Hi)`,
			please_wait: `please_wait(Hi)`,
		},
	},
	login: {
		title: `title(Hi)`,
		username: `username(Hi)`,
		password: `password(Hi)`,
	},
	next: `next(Hi)`,
	okay: `okay(Hi)`,
	done: `done(Hi)`,
}
export default Hindi