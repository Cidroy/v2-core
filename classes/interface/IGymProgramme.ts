import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymProgramme extends IEntityBase {
	name: string,
	description?: string
}