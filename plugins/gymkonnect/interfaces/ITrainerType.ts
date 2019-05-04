import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ITrainerType extends IEntityBase {
	name: string,
	description?: string
}
