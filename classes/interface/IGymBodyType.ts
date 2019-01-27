import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymBodyType extends IEntityBase {
	name: string,
	description?: string
}