import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"
import { ADDRESS_TYPE } from "@plugins/core/enum/misc"

export default interface IAddress extends IEntityBase{
	receiver: string,
	contact: string,
	house: string,
	locality?: string,
	landmark?: string,
	city: string,
	state: string,
	country: string,
	pincode: string,
	type: ADDRESS_TYPE,
	user?: number,
}