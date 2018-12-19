declare namespace ElectronData{
	interface Constructor {
		filename?: string,
		path?: string,
		autosave?: boolean,
		prettysave?: boolean,
		lastUpdate?: boolean,
	}

	interface ElectronData{
		config(config: Constructor): void
		getOptions(): Promise<Constructor>
		has(key: string): Promise<boolean>
		keys(): Promise<string[]>
		get(key: string): Promise<Object>
		getMany(keys: string[]): Promise<Object>
		getAll(): Promise<Object>
		set(key: string, value: any): Promise<Object>
		setMany(object: Object): Promise<Object>
		unset(key: string): Promise<boolean>
		clear(): Promise<Object>
		save(): Promise<undefined|string>
	}
}

declare var ElectronData : ElectronData.ElectronData

declare module "electron-data"{
	export = ElectronData
}