import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ICounsellorType extends IEntityBase {
	name: string,
	description?: string
}