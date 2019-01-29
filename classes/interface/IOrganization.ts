import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IOrganization extends IEntityBase {
	name : string,
	description? : string
}