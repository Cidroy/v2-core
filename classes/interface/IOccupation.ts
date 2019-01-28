import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IOccupation extends IEntityBase {
	name: string,
	description?: string
}