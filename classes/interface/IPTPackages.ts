import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPTPackages extends IEntityBase {
	name: string,
	description?: string
}