import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IPTPurpose extends IEntityBase {
	name: string,
	description?: string
}
