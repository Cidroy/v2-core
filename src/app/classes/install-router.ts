import lazyLoadView from "@/utils/lazy-load-view"
import { ILanguage } from "@/i18n"
import { SoftwareMode } from "@classes/enum/software-mode"
import { SupportedBiometricDevice } from "@classes/enum/supported-biometric-devices"

export interface IRoute {
	path: string
	name: string
	component: () => Promise<any>
	props: boolean
}

export enum Stage {
	NONE = "none",
	LANGUAGE = "language",
	PRODUCT_KEY = "product-key",
	MODE_SELECT = "mode-select",
	SLAVE_MODE = "slave-mode",
	HARDWARE_SELECT = "hardware-select",
	HARDWARE_CONFIRM = "hardware-confirm",
	DONE = "done",
}

type TRouteCollection = {
	[K in Stage]: IRoute
}

export const routesCollection: TRouteCollection = {
	[Stage.NONE]: {
		path: "/0",
		name: "install-none",
		component: () => lazyLoadView("/install/1-language"),
		props: true
	},
	[Stage.LANGUAGE]: {
		path: "/",
		name: "install-language",
		component: () => lazyLoadView("/install/1-language"),
		props: true
	},
	[Stage.PRODUCT_KEY]: {
		path: "/2",
		name: "install-product-login",
		component: () => lazyLoadView("/install/2-product-login"),
		props: true
	},
	[Stage.MODE_SELECT]: {
		path: "/3",
		name: "install-mode-select",
		component: () => lazyLoadView("/install/3-mode-select"),
		props: true
	},
	[Stage.SLAVE_MODE]: {
		path: "/4",
		name: "install-slave-mode",
		component: () => lazyLoadView("/install/4-slave-mode"),
		props: true
	},
	[Stage.HARDWARE_SELECT]: {
		path: "/5",
		name: "install-hardware-select",
		component: () => lazyLoadView("/install/5-hardware-select"),
		props: true
	},
	[Stage.HARDWARE_CONFIRM]: {
		path: "/6",
		name: "install-hardware-confirm",
		component: () => lazyLoadView("/install/6-hardware-confirm"),
		props: true
	},
	[Stage.DONE]: {
		path: "/7",
		name: "install-completed",
		component: () => lazyLoadView("/install/7-completed"),
		props: true
	}
}

export interface IDevice{
	ip: string,
	name: string,
	type: SupportedBiometricDevice
}

export interface IStageCollection {
	stage: Stage
	param: TNext
}

export type TStageProductKey = {
	username: string
	password: string
	key: string
}

export type TStageLanguage = {
	language: ILanguage
}

export type TStageMode = {
	mode: SoftwareMode
}

export type TStageHardware = {
	biometric: IDevice[]
}

export type TStageSlave = {
	ip: string
}

export type TStageDone = {
	done: boolean
}

export type TNext	= TStageLanguage
					| TStageProductKey
					| TStageMode
					| TStageHardware
					| TStageSlave
					| TStageDone