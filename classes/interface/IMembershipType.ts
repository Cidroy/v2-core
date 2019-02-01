import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IMembershipType extends IEntityBase {
	name: string,
	description?: string
}