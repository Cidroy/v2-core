type Country = {
	shortName: string,
	name: string,
	native: string,
	phone: string,
	continent: string,
	capital: string,
	currency: string,
	languages: string[],
	emoji: string,
	emojiU: string
}

type City = { id: string, name: string, state_id: string }

export function getAll(): any
export function getCities(shortName: string, state: string): string[]
export function getCountries(): Country[]
export function getCountriesShort(): string[]
export function getCountryByShort(shortName: string): Country & { states:{ [state: string]: City[] } }
export function getCountryInfoByShort(shortName: string): Country
export function getStatesByShort(shortName: string): string[]
