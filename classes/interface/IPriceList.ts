import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPriceList extends IEntityBase {
	typeName : string,
	typeId : number,
	organization : number,
	price : number
}