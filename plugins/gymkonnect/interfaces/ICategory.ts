import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ICategory extends IEntityBase {
	name: string,
	description?: string
}
