import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IPriceList extends IEntityBase {
	typeName : string,
	typeId : number,
	organization : number,
	price : number
}
