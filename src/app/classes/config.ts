import * as TS from "@rubix-code/typeserializer"
import { i18n, ILanguage } from "@/i18n"
import { TStageLanguage, TStageProductKey } from "@/classes/install-router"

/**
 * Configuration object that stores the root functionality settings
 *
 * @class config
 * @author Rinzler D. Vicky
 * @version 0.0.1
 */
@TS.Strategy(TS.ExclusionPolicy.ALL)
class config implements TStageLanguage, TStageProductKey {

	private _username!: string
	public get username(){ return this._username }
	public set username(value: string){
		if(!value) value = ""
		this._username = value
	}

	private _password!: string
	public get password(){ return this._password }
	public set password(value: string){
		if(!value) value = ""
		this._password = value
	}

	@TS.Expose()
	@TS.Name("key")
	private _key!: string
	public get key(){ return this._key }
	public set key(value: string){
		if(!value) value = ""
		this._key = value
	}
	/**
	 * store the application default language
	 * @type {ILanguage}
	 * @memberof CONFIG
	 */
	@TS.Expose()
	@TS.Name("language")
	private _language!: ILanguage
	public get language(){ return this._language }
	public set language(value: ILanguage ){
		if(!value) value = i18n.default
		this._language = value
	}
	public deserialize(json: object): void {
		throw new Error("Method not implemented.")
	}
	/**
	 *Creates an empty instance of CONFIG.
	 * @memberof CONFIG
	 */
	constructor()
	/**
	 *Creates an instance of CONFIG from JSON String.
	 * @param {string} json
	 * @memberof CONFIG
	 */
	constructor(json: string)
	/**
	 *Creates an instance of CONFIG from JSON Object.
	 * @param {object} json
	 * @memberof CONFIG
	 */
	constructor(json: object)
	constructor(json?: string | object) {
		if(typeof(json)==="string") this.deserialize(JSON.parse(json))
		else if(typeof(json)==="object") this.deserialize(json)
	}

	/**
	 *convert this object to serialized json string.
	 *
	 * @returns {string}
	 * @memberof config
	 */
	public toSting(): string {
		return TS.serialize(this)
	}

	/**
	 *convert this object to serialized json object
	 *
	 * @returns {object}
	 * @memberof config
	 */
	
	public toObject(): object{
		return JSON.parse(TS.serialize(this))
	}
}

export{
	config
}