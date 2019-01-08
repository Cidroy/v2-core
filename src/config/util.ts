const isNotInstalled = () => false

type  ILanguage =
				  "en-US"
				| "hi-IN"
				// | "ko-IN"
				// | "ma-IN"
				// | "tm-IN"
				// | "kn-IN"
				// | "jp-JP"
				// | "ko-KO"
				// | "ru-RU"

type ISupportedLanguages = { [K in string]: ILanguage }
const SupportedLanguages: ISupportedLanguages  = {
	English: "en-US",
	हिंदी: "hi-IN",
	// कोंकणी: "ko-IN",
	// मराठी: "ma-IN",
	// தமிழ்: "tm-IN",
	// ಕನ್ನಡ್: "kn-IN",
	// 日本語: "jp-JP",
	// 한국어: "ko-KO",
	// русский: "ru-RU",
}

class i18n {
	private static locale: ILanguage = "en-US"

	public static get default(): ILanguage { return "en-US" }
	public static get preload(): ILanguage[] { return [] }
	public static get list():ISupportedLanguages { return SupportedLanguages }
	public static get current(): ILanguage { return i18n.locale }
	public static set current(localeId: ILanguage) { i18n.locale = localeId }
	public static async save(): Promise<boolean> {
		// save to file
		await Promise.all([
			Promise.resolve(1),
			Promise.resolve(2),
		])
		return true
	}
	public static async initialize() {
		// load config from file accordingly
	}
}

export {
	isNotInstalled,
	i18n,
	ILanguage
}