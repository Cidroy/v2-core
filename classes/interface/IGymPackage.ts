import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymPackage extends IEntityBase {
	name: string,
	description?: string
}