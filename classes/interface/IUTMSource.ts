import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IUTMSource extends IEntityBase {
	name: string,
	description?: string
}