import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymPurpose extends IEntityBase {
	name: string,
	description?: string
}