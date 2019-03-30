import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IServicesAvailable extends IEntityBase {
	name : string,
	description? : string
}