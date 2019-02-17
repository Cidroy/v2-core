import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IBloodGroup extends IEntityBase {
	name: string,
	description?: string
}