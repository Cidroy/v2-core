import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGymBodyType extends IEntityBase {
	name: string,
	description?: string
}
