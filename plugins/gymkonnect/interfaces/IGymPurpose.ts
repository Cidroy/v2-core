import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGymPurpose extends IEntityBase {
	name: string,
	description?: string
}
