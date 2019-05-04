import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"
export default interface IIDType extends IEntityBase {
	name: string,
	description?: string
}
