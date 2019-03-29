import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPTPurpose extends IEntityBase {
	name: string,
	description?: string
}