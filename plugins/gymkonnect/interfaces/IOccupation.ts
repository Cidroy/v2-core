import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IOccupation extends IEntityBase {
	name: string,
	description?: string
}
