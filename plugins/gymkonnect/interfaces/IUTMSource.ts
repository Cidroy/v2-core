import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IUTMSource extends IEntityBase {
	name: string,
	description?: string
}
