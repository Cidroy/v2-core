import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGymUserMode extends IEntityBase {
	name: string,
	description?: string
}
