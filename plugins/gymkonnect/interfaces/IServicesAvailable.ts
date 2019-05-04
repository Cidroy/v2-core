import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IServicesAvailable extends IEntityBase {
	name : string,
	description? : string
}
