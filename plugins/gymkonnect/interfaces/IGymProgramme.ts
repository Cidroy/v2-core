import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGymProgramme extends IEntityBase {
	name: string,
	description?: string
}