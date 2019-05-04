import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ICounsellorType extends IEntityBase {
	name: string,
	description?: string
}
