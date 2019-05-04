import AddressJSON from "countrycitystatejson"

let DEFAULT_COUNTRY_SHORT = "IN"
let DEFAULT_STATE_SHORT = "Goa"

export default class AddressStore {
	public static get DEFAULT_COUNTRY_SHORT(){ return DEFAULT_COUNTRY_SHORT }
	public static set DEFAULT_COUNTRY_SHORT(value: string){ DEFAULT_COUNTRY_SHORT = value }

	public static get DEFAULT_STATE_SHORT(){ return DEFAULT_STATE_SHORT }
	public static set DEFAULT_STATE_SHORT(value: string){ DEFAULT_STATE_SHORT = value }

	public static get DEFAULT_CITY(){ return AddressStore.CITIES[0] }

	public static COUNTRIES = () => AddressJSON.getCountries()
	public static COUNTRY = (countryShortName: string = AddressStore.DEFAULT_COUNTRY_SHORT) => AddressJSON.getCountryByShort(countryShortName)
	public static STATES = (countryShortName: string = AddressStore.DEFAULT_COUNTRY_SHORT): string[] => AddressJSON.getStatesByShort(countryShortName)
	public static CITIES = (countryShortName: string = AddressStore.DEFAULT_COUNTRY_SHORT, state: string = DEFAULT_STATE_SHORT): string[] => AddressJSON.getCities(countryShortName, state)
	public static MOBILE_PREFIX = (countryShortName: string = AddressStore.DEFAULT_COUNTRY_SHORT) => AddressJSON.getCountryByShort(countryShortName).phone
}
