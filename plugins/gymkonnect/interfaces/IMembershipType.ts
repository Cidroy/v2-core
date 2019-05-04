import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IMembershipType extends IEntityBase {
	name: string,
	description?: string
}
