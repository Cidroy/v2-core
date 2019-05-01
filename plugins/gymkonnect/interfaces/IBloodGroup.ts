import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IBloodGroup extends IEntityBase {
	name: string,
	description?: string
}