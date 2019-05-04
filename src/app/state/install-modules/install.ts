import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import { i18n, ILanguage } from "@/i18n"
import store from "@plugins/core/state/store"
import { Stage } from "@plugins/core/classes/install-router"

type TInstallerLayout = "app-installer-large-layout" | "app-installer-small-layout"
export interface IInstallerStore{
	LANGUAGE: ILanguage
	setLanguage(lang: ILanguage): Promise<object>
	HELPDOC: Stage
	setHelpdoc(docname: Stage): Promise<object>
	REVERT_BUTTON: boolean
	setRevertButton(state: boolean): Promise<object>
	INSTALL_PAGE_TITLE: string
	setInstallPageTitle(state: string): Promise<object>
	INSTALLER_LAYOUT: TInstallerLayout
	setInstallerLayout(state: TInstallerLayout): Promise<object>
}

@Module({ dynamic: true, store, name: "install" })
class Installer extends VuexModule implements IInstallerStore{
	private _language: ILanguage = i18n.default
	public get LANGUAGE(): ILanguage{ return this._language }
	@MutationAction({ mutate: [ "_language", ] }) public async setLanguage(lang: ILanguage){
		i18n.loadLanguageAsync(lang)
		return { _language : lang}
	}

	private _helpdoc: Stage = Stage.NONE
	public get HELPDOC(): Stage{ return this._helpdoc }
	@MutationAction({ mutate: [ "_helpdoc", ] }) public async setHelpdoc(docname: Stage) { return { _helpdoc : docname} }

	private _revertButton: boolean = false
	public get REVERT_BUTTON(): boolean { return this._revertButton }
	@MutationAction({ mutate: [ "_revertButton", ] }) public async setRevertButton(state: boolean) {
		return { _revertButton : state }
	}

	private _installPageTitle: string = "install.steps.please_wait"
	public get INSTALL_PAGE_TITLE(): string { return this._installPageTitle }
	@MutationAction({ mutate: [ "_installPageTitle", ] }) public async setInstallPageTitle(state: string) {
		return { _installPageTitle : state }
	}

	private _installerLayout: TInstallerLayout = "app-installer-large-layout"
	public get INSTALLER_LAYOUT(): TInstallerLayout { return this._installerLayout }
	@MutationAction({ mutate: [ "_installerLayout", ] }) public async setInstallerLayout(state: TInstallerLayout) {
		return { _installerLayout : state }
	}
}

export const InstallerStore = getModule(Installer)
