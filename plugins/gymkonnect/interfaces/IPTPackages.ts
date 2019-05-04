import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IPTPackages extends IEntityBase {
	name: string,
	description?: string
}
