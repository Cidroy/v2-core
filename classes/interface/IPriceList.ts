import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPriceList extends IEntityBase {
	typeName : string,
	typeId : string,
	organization : string,
	price : number
}